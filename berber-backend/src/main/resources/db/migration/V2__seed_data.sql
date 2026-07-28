-- Admin kullanıcısı (şifre: admin123 → BCrypt)
INSERT INTO users (full_name, email, password, role, work_start, work_end)
VALUES (
    'Admin',
    'admin@berber.com',
    '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'ADMIN',
    '09:00:00',
    '20:00:00'
) ON CONFLICT (email) DO NOTHING;

-- Personeller
INSERT INTO users (full_name, email, password, role, work_start, work_end) VALUES
    ('Umut Usta',  'umut@berber.com',  '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STAFF', '09:00:00', '21:00:00'),
    ('Yasin Usta', 'yasin@berber.com', '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'STAFF', '09:00:00', '21:00:00')
ON CONFLICT (email) DO NOTHING;

-- Hizmetler
INSERT INTO services (name, duration_minutes, buffer_minutes, price) VALUES
    ('Saç Kesimi',          30, 5,  150.00),
    ('Sakal Tıraşı',        20, 5,  100.00),
    ('Saç + Sakal',         45, 10, 220.00),
    ('Çocuk Saç Kesimi',    20, 5,  100.00),
    ('Bıyık Düzeltme',      15, 5,  60.00),
    ('Saç Boyama',          90, 15, 400.00)
ON CONFLICT DO NOTHING;
