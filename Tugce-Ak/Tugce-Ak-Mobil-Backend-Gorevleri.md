# Tuğçe Ak - Mobil Backend Görevleri

## Genel Bilgi
Mobil uygulama için backend API optimizasyonları ve yeni endpoint'ler.

## Mevcut API Endpoint'leri (Mobil Uyumlu)

### 1. Kimlik Doğrulama (Auth) API
* `POST /v1/auth/register` — Kullanıcı kaydı
* `POST /v1/auth/login` — Kullanıcı girişi
* `POST /v1/auth/logout` — Kullanıcı çıkışı (yeni — JWT blacklist)

**Mobil İyileştirmeler:**
- JWT token süresi: 7 gün (mobil kullanım için uygun)
- Logout endpoint: Token'ı Redis blacklist'e ekleme
- Token yenileme (refresh token) — gelecek

### 2. Temizlik Raporu (Clean Report) API
* `POST /v1/clean-reports` — Temizlik raporu oluşturma
* `DELETE /v1/clean-reports/:id` — Temizlik raporu silme

**Mobil İyileştirmeler:**
- RabbitMQ bildirim entegrasyonu (temizlik raporu oluşturulduğunda)
- Resim sıkıştırma (mobil upload optimizasyonu)

### 3. Profil API
* `GET /v1/profile` — Kendi profilini getirme
* `PUT /v1/profile` — Profil güncelleme
* `DELETE /v1/profile` — Hesap silme

### 4. Kullanıcı API
* `GET /v1/users/:id` — Kullanıcı profili
* `GET /v1/users/:id/posts` — Kullanıcının gönderileri
* `PUT /v1/users/:id/points` — Puan güncelleme

### 5. Liderlik Tablosu API
* `GET /v1/leaderboard` — Top 50 kullanıcı

**Mobil İyileştirmeler:**
- Redis cache (10 dakika TTL)
- Pagination desteği

### 6. Şikayet (Abuse) API
* `POST /v1/reports/abuse` — İçerik şikayeti

### 7. Görev (Task) API
* `PUT /v1/tasks/:id/status` — Görev durumu güncelleme

## Yeni Entegrasyonlar

### JWT Token Blacklist (Redis)
- `POST /v1/auth/logout` → Token'ı Redis'e blacklist olarak ekleme
- Auth middleware'de her istekte blacklist kontrolü
- Token kalan süresi kadar TTL ile Redis'e kayıt

### RabbitMQ Bildirim Sistemi
- `createCleanReport` → Bildirim kuyruğuna mesaj gönderme
- Fallback: RabbitMQ yoksa MongoDB'ye doğrudan kayıt

### Redis Cache
- `GET /v1/leaderboard` → 10 dakika TTL ile cache
- Cache invalidation: Sıralama değiştiğinde cache temizleme

## Controller Dosyaları
- `backend/controllers/authController.js`
- `backend/controllers/cleanController.js`
- `backend/controllers/profileController.js`
- `backend/controllers/userController.js`
- `backend/controllers/leaderboardController.js`
- `backend/controllers/abuseController.js`
- `backend/controllers/taskController.js`

## Route Dosyaları
- `backend/routes/authRoutes.js`
- `backend/routes/cleanRoutes.js`
- `backend/routes/profileRoutes.js`
- `backend/routes/userRoutes.js`
- `backend/routes/leaderboardRoutes.js`
- `backend/routes/abuseRoutes.js`
- `backend/routes/taskRoutes.js`

## Model Dosyaları
- `backend/models/User.js`
- `backend/models/CleanReport.js`
- `backend/models/AbuseReport.js`
- `backend/models/Notification.js` (yeni)
