package com.berber.config;

import com.berber.model.User;
import com.berber.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("Admin şifresi senkronizasyonu başlıyor...");
        
        Optional<User> adminOpt = userRepository.findByEmail("admin@berber.com");
        if (adminOpt.isPresent()) {
            User admin = adminOpt.get();
            // Şifreyi, mevcut PasswordEncoder ile kesinlikle eşleşecek şekilde ez (Farklı bakış açısı)
            admin.setPassword(passwordEncoder.encode("admin123"));
            userRepository.save(admin);
            log.info("Admin şifresi başarıyla 'admin123' olarak güncellendi (Yeni Hash).");
        }
    }
}
