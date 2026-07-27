package com.berber.dto.request;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record SlotQueryRequest(
        @NotNull Long staffId,
        @NotNull Long serviceId,
        @NotNull LocalDate date
) {}
