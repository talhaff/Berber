package com.berber.dto.response;

import java.math.BigDecimal;

public record ServiceResponse(
        Long id,
        String name,
        Integer durationMinutes,
        Integer bufferMinutes,
        BigDecimal price
) {}
