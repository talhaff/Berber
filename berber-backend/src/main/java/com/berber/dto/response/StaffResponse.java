package com.berber.dto.response;

import com.berber.model.User.Role;
import java.time.LocalTime;

public record StaffResponse(
        Long id,
        String fullName,
        Role role,
        LocalTime workStart,
        LocalTime workEnd
) {}
