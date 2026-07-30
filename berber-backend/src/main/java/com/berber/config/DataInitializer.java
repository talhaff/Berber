package com.berber.config;

import com.berber.model.User;
import com.berber.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Kullanıcı şifreleri senkronize ediliyor...");

        updatePassword("admin@berber.com", "admin123");
        updatePassword("umut@berber.com", "umut123");
        updatePassword("yasin@berber.com", "yasin123");
    }

    private void updatePassword(String email, String rawPassword) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setPassword(passwordEncoder.encode(rawPassword));
            userRepository.save(user);
            log.info("Şifre başarıyla senkronize edildi: {}", email);
        });
    }
}
