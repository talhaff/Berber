package com.berber.repository;

import com.berber.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("""
        SELECT a FROM Appointment a
        JOIN FETCH a.customer
        JOIN FETCH a.service
        WHERE a.staff.id = :staffId
          AND a.startTime >= :dayStart
          AND a.startTime < :dayEnd
          AND a.status NOT IN ('CANCELLED', 'NOSHOW')
        ORDER BY a.startTime
        """)
    List<Appointment> findActiveByStaffAndDay(
            @Param("staffId") Long staffId,
            @Param("dayStart") LocalDateTime dayStart,
            @Param("dayEnd") LocalDateTime dayEnd
    );

    @Query("""
        SELECT a FROM Appointment a
        JOIN FETCH a.customer
        JOIN FETCH a.service
        JOIN FETCH a.staff
        WHERE a.startTime >= :dayStart
          AND a.startTime < :dayEnd
        ORDER BY a.startTime
        """)
    List<Appointment> findAllByDay(
            @Param("dayStart") LocalDateTime dayStart,
            @Param("dayEnd") LocalDateTime dayEnd
    );

    @Query("""
        SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END
        FROM Appointment a
        WHERE a.staff.id = :staffId
          AND a.status NOT IN ('CANCELLED', 'NOSHOW')
          AND a.startTime < :endTime
          AND a.endTime > :startTime
        """)
    boolean existsConflict(
            @Param("staffId") Long staffId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
}
