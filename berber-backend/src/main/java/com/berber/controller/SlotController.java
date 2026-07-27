package com.berber.controller;

import com.berber.dto.response.TimeSlotResponse;
import com.berber.service.SlotCalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3002"})
public class SlotController {

    private final SlotCalculationService slotCalculationService;

    @GetMapping
    public ResponseEntity<List<TimeSlotResponse>> getAvailableSlots(
            @RequestParam Long staffId,
            @RequestParam Long serviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(slotCalculationService.getAvailableSlots(staffId, serviceId, date));
    }
}
