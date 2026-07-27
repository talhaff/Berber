package com.berber.dto.request;

import com.berber.model.Appointment.AppointmentStatus;
import jakarta.validation.constraints.NotNull;

public record AppointmentStatusUpdateRequest(
        @NotNull AppointmentStatus status
) {}
