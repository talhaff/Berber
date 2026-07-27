package com.berber.exception;

public class SlotAlreadyLockedException extends RuntimeException {
    public SlotAlreadyLockedException(String time) {
        super("Bu saat dilimi şu anda başka bir müşteri tarafından kilitli: " + time + ". Lütfen 3 dakika içinde tekrar deneyin.");
    }
}
