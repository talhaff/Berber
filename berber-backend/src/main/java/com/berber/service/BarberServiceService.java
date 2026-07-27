package com.berber.service;

import com.berber.dto.response.ServiceResponse;
import com.berber.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BarberServiceService {

    private final ServiceRepository serviceRepository;

    @Transactional(readOnly = true)
    public List<ServiceResponse> getAllActive() {
        return serviceRepository.findByActiveTrue().stream()
                .map(s -> new ServiceResponse(
                        s.getId(), s.getName(),
                        s.getDurationMinutes(), s.getBufferMinutes(), s.getPrice()))
                .toList();
    }
}
