package com.berber.dto.response;

import com.berber.model.Appointment.AppointmentStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AppointmentResponse(
        Long id,
        String customerName,
        String customerPhone,
        String serviceName,
        Integer durationMinutes,
        BigDecimal price,
        String staffName,
        LocalDateTime startTime,
        LocalDateTime endTime,
        AppointmentStatus status,
        String notes
) {}
