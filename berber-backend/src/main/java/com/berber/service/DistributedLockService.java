package com.berber.service;

import com.berber.exception.SlotAlreadyLockedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class DistributedLockService {

    private final RedissonClient redissonClient;

    @Value("${app.redis.slot-lock-ttl-seconds:180}")
    private long slotLockTtlSeconds;

    private static final String LOCK_PREFIX = "berber:slot:lock:";

    private String buildLockKey(Long staffId, LocalDate date, LocalTime time) {
        return LOCK_PREFIX + staffId + ":" + date + ":" + time;
    }

    /**
     * Belirtilen personelin saat dilimini 3 dakika için kilitler.
     * Kilit zaten alınmışsa SlotAlreadyLockedException fırlatır.
     */
    public void acquireSlotLock(Long staffId, LocalDate date, LocalTime time) {
        String lockKey = buildLockKey(staffId, date, time);
        RLock lock = redissonClient.getLock(lockKey);

        boolean acquired;
        try {
            acquired = lock.tryLock(0, slotLockTtlSeconds, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new SlotAlreadyLockedException(time.toString());
        }

        if (!acquired) {
            log.warn("Slot lock could not be acquired for key: {}", lockKey);
            throw new SlotAlreadyLockedException(time.toString());
        }

        log.debug("Slot lock acquired: {} TTL={}s", lockKey, slotLockTtlSeconds);
    }

    /**
     * Randevu başarıyla kaydedildikten sonra kilidi serbest bırakır.
     * Distributed Lock: kilit sadece sahibi tarafından açılabilir.
     */
    public void releaseSlotLock(Long staffId, LocalDate date, LocalTime time) {
        String lockKey = buildLockKey(staffId, date, time);
        RLock lock = redissonClient.getLock(lockKey);

        if (lock.isHeldByCurrentThread()) {
            lock.unlock();
            log.debug("Slot lock released: {}", lockKey);
        }
    }

    /**
     * Randevu kaydı tamamlandı, kilit kalıcı olarak silinir.
     * (TTL zaten devreye girer ama hızlıca temizliyoruz)
     */
    public void forceDeleteSlotLock(Long staffId, LocalDate date, LocalTime time) {
        String lockKey = buildLockKey(staffId, date, time);
        RLock lock = redissonClient.getLock(lockKey);
        lock.forceUnlock();
        log.debug("Slot lock force deleted: {}", lockKey);
    }

    public boolean isSlotLocked(Long staffId, LocalDate date, LocalTime time) {
        String lockKey = buildLockKey(staffId, date, time);
        return redissonClient.getLock(lockKey).isLocked();
    }
}
