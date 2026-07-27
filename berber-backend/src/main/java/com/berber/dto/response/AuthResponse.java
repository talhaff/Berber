package com.berber.dto.response;

public record AuthResponse(
        String token,
        String email,
        String role,
        String fullName
) {}
