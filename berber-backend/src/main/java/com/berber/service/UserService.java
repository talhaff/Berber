package com.berber.service;

import com.berber.dto.response.StaffResponse;
import com.berber.model.User;
import com.berber.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<StaffResponse> getAllActiveStaff() {
        return userRepository.findByActiveTrue().stream()
                .map(u -> new StaffResponse(
                        u.getId(), u.getFullName(),
                        u.getRole(), u.getWorkStart(), u.getWorkEnd()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<StaffResponse> getStaffOnly() {
        return userRepository.findByRoleAndActiveTrue(User.Role.STAFF).stream()
                .map(u -> new StaffResponse(
                        u.getId(), u.getFullName(),
                        u.getRole(), u.getWorkStart(), u.getWorkEnd()))
                .toList();
    }
}
