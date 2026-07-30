-- Personel isimlerini Umut Usta ve Yasin Usta yap, çalışma saatlerini 09:00 - 21:00 olarak güncelle
UPDATE users
SET full_name = 'Umut Usta', email = 'umut@berber.com', work_start = '09:00:00', work_end = '21:00:00'
WHERE id = 2 OR email = 'umut@berber.com' OR full_name LIKE '%Umut%' OR full_name LIKE '%Umut%';

UPDATE users
SET full_name = 'Yasin Usta', email = 'yasin@berber.com', work_start = '09:00:00', work_end = '21:00:00'
WHERE id = 3 OR email = 'yasin@berber.com' OR full_name LIKE '%Yasin%' OR full_name LIKE '%Yasin%';

-- Tüm STAFF kullanıcılarının çalışma saatlerini 09:00 - 21:00 yap
UPDATE users
SET work_start = '09:00:00', work_end = '21:00:00'
WHERE role = 'STAFF';
