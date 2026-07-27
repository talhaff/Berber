package com.berber.controller;

import com.berber.dto.response.ServiceResponse;
import com.berber.dto.response.StaffResponse;
import com.berber.service.BarberServiceService;
import com.berber.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3002"})
public class PublicController {

    private final BarberServiceService barberServiceService;
    private final UserService userService;

    @GetMapping("/services")
    public ResponseEntity<List<ServiceResponse>> getServices() {
        return ResponseEntity.ok(barberServiceService.getAllActive());
    }

    @GetMapping("/staff")
    public ResponseEntity<List<StaffResponse>> getStaff() {
        return ResponseEntity.ok(userService.getStaffOnly());
    }
}
