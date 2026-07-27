package com.berber.repository;

import com.berber.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByActiveTrue();
    List<User> findByRoleAndActiveTrue(User.Role role);
    boolean existsByEmail(String email);
}
