package com.berber.service;

import com.berber.dto.request.AppointmentCreateRequest;
import com.berber.dto.request.AppointmentStatusUpdateRequest;
import com.berber.dto.response.AppointmentResponse;
import com.berber.exception.*;
import com.berber.model.*;
import com.berber.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.*;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository    customerRepository;
    private final ServiceRepository     serviceRepository;
    private final UserRepository        userRepository;
    private final DistributedLockService lockService;

    @Transactional
    public AppointmentResponse createAppointment(AppointmentCreateRequest req) {
        BarberService service = serviceRepository.findById(req.serviceId())
                .orElseThrow(() -> ResourceNotFoundException.of("Hizmet", req.serviceId()));

        User staff = userRepository.findById(req.staffId())
                .orElseThrow(() -> ResourceNotFoundException.of("Personel", req.staffId()));

        LocalTime requestedTime = LocalTime.parse(req.startTime());
        LocalDateTime startTime = req.date().atTime(requestedTime);
        LocalDateTime endTime   = startTime.plusMinutes(service.getTotalDurationMinutes());

        // Redis Soft-Lock: 3 dk TTL ile slot kilitle
        lockService.acquireSlotLock(req.staffId(), req.date(), requestedTime);

        try {
            // DB çakışma kontrolü — double-booking son savunma hattı
            boolean conflict = appointmentRepository.existsConflict(req.staffId(), startTime, endTime);
            if (conflict) {
                throw new SlotConflictException(req.startTime());
            }

            // Müşteri: telefon numarasına göre getir veya oluştur (idempotent)
            Customer customer = customerRepository.findByPhone(req.customerPhone())
                    .orElseGet(() -> customerRepository.save(
                            Customer.builder()
                                    .fullName(req.customerName())
                                    .phone(req.customerPhone())
                                    .build()
                    ));

            Appointment appointment = Appointment.builder()
                    .customer(customer)
                    .service(service)
                    .staff(staff)
                    .startTime(startTime)
                    .endTime(endTime)
                    .status(Appointment.AppointmentStatus.PENDING)
                    .build();

            Appointment saved = appointmentRepository.save(appointment);

            // Randevu kaydedildi, kilit artık gerekli değil
            lockService.forceDeleteSlotLock(req.staffId(), req.date(), requestedTime);

            log.info("Appointment created: id={} staff={} time={}", saved.getId(), staff.getFullName(), startTime);
            return toResponse(saved);

        } catch (SlotConflictException | SlotAlreadyLockedException ex) {
            lockService.releaseSlotLock(req.staffId(), req.date(), requestedTime);
            throw ex;
        } catch (Exception ex) {
            lockService.releaseSlotLock(req.staffId(), req.date(), requestedTime);
            throw ex;
        }
    }

    @Transactional
    public AppointmentResponse updateStatus(Long id, AppointmentStatusUpdateRequest req) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Randevu", id));
        appointment.setStatus(req.status());
        return toResponse(appointmentRepository.save(appointment));
    }

    @Transactional(readOnly = true)
    public List<AppointmentResponse> getDayAppointments(LocalDate date) {
        LocalDateTime dayStart = date.atStartOfDay();
        LocalDateTime dayEnd   = date.atTime(LocalTime.MAX);

        org.springframework.security.core.Authentication auth = 
                org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated()) {
            String email = auth.getName();
            User currentUser = userRepository.findByEmail(email).orElse(null);
            if (currentUser != null && currentUser.getRole() == User.Role.STAFF) {
                return appointmentRepository.findAllByStaffAndDay(currentUser.getId(), dayStart, dayEnd)
                        .stream().map(this::toResponse).toList();
            }
        }

        return appointmentRepository.findAllByDay(dayStart, dayEnd)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public void cancelAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Randevu", id));
        appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    private AppointmentResponse toResponse(Appointment a) {
        return new AppointmentResponse(
                a.getId(),
                a.getCustomer().getFullName(),
                a.getCustomer().getPhone(),
                a.getService().getName(),
                a.getService().getDurationMinutes(),
                a.getService().getPrice(),
                a.getStaff().getFullName(),
                a.getStartTime(),
                a.getEndTime(),
                a.getStatus(),
                a.getNotes()
        );
    }
}
