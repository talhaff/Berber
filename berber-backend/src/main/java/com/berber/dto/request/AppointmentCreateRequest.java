package com.berber.dto.request;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record AppointmentCreateRequest(
        @NotNull Long serviceId,
        @NotNull Long staffId,
        @NotNull LocalDate date,
        @NotNull @Pattern(regexp = "\\d{2}:\\d{2}") String startTime,
        @NotBlank String customerName,
        @NotBlank @Pattern(regexp = "0[5][0-9]{9}") String customerPhone
) {}
