package com.berber.service;

import com.berber.dto.response.TimeSlotResponse;
import com.berber.exception.ResourceNotFoundException;
import com.berber.model.Appointment;
import com.berber.model.BarberService;
import com.berber.model.User;
import com.berber.repository.AppointmentRepository;
import com.berber.repository.ServiceRepository;
import com.berber.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Dinamik Slot Hesaplama Servisi
 *
 * Algoritma:
 * 1. Personelin çalışma saatleri içinde, hizmet toplam süresi (duration + buffer) kadar adım at.
 * 2. Her potansiyel slot için, o personelin onaylı randevularıyla çakışma kontrolü yap.
 * 3. Redis'te kilitli olan slotları "locked: true" olarak işaretle.
 * 4. Sadece çakışmasız slotları döndür.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SlotCalculationService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final DistributedLockService lockService;

    public List<TimeSlotResponse> getAvailableSlots(Long staffId, Long serviceId, LocalDate date) {
        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> ResourceNotFoundException.of("Personel", staffId));

        BarberService service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> ResourceNotFoundException.of("Hizmet", serviceId));

        if (!staff.isActive()) {
            return List.of();
        }

        LocalDateTime dayStart = date.atTime(staff.getWorkStart());
        LocalDateTime dayEnd   = date.atTime(staff.getWorkEnd());

        // O güne ait aktif randevuları çek
        List<Appointment> existingAppointments = appointmentRepository
                .findActiveByStaffAndDay(staffId, dayStart, dayEnd);

        int totalMinutes = service.getTotalDurationMinutes();
        List<TimeSlotResponse> availableSlots = new ArrayList<>();

        // Çalışma saatleri boyunca 30 dakikalık adımlarla slotları hesapla
        LocalDateTime cursor = dayStart;
        while (!cursor.plusMinutes(totalMinutes).isAfter(dayEnd)) {
            LocalDateTime slotStart = cursor;
            LocalDateTime slotEnd   = cursor.plusMinutes(totalMinutes);

            boolean hasConflict = existingAppointments.stream()
                    .anyMatch(appt -> isOverlapping(appt.getStartTime(), appt.getEndTime(), slotStart, slotEnd));

            if (!hasConflict) {
                boolean isLocked = lockService.isSlotLocked(staffId, date, slotStart.toLocalTime());
                availableSlots.add(new TimeSlotResponse(
                        slotStart.toLocalTime(),
                        slotEnd.toLocalTime(),
                        isLocked
                ));
            }

            cursor = cursor.plusMinutes(30);
        }

        log.debug("Staff={} Date={} Service={}: {} available slots calculated",
                staffId, date, serviceId, availableSlots.size());

        return availableSlots;
    }

    /**
     * İki zaman aralığının çakışıp çakışmadığını kontrol eder.
     * Çakışma koşulu: existingStart < newEnd AND existingEnd > newStart
     */
    private boolean isOverlapping(LocalDateTime existStart, LocalDateTime existEnd,
                                   LocalDateTime newStart,   LocalDateTime newEnd) {
        return existStart.isBefore(newEnd) && existEnd.isAfter(newStart);
    }
}
