package com.berber.repository;

import com.berber.model.BarberService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<BarberService, Long> {
    List<BarberService> findByActiveTrue();
}
