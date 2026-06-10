# Ahmet Kağan Karababa - Mobil Backend Görevleri

## Genel Bilgi
Mobil uygulama için backend API optimizasyonları ve yeni endpoint'ler.

## Mevcut API Endpoint'leri (Mobil Uyumlu)

### 1. Kirlilik Raporu (Pollution Report) API
* `GET /v1/pollution-reports` — Tüm raporları listeleme
* `POST /v1/pollution-reports` — Yeni rapor oluşturma (multipart/form-data)
* `PUT /v1/pollution-reports/:id` — Rapor güncelleme
* `DELETE /v1/pollution-reports/:id` — Rapor silme

**Mobil İyileştirmeler:**
- Sayfalama (pagination) desteği: `?page=1&limit=10`
- Resim boyutu optimizasyonu (thumbnail vs full)
- RabbitMQ bildirim entegrasyonu (yeni rapor oluşturulduğunda)
- Redis cache (GET listesi 5dk TTL)

### 2. Yorum (Comment) API
* `POST /v1/comments` — Yorum ekleme
* `GET /v1/comments/:taskId` — Yorumları listeleme
* `DELETE /v1/comments/:id` — Yorum silme
* `POST /v1/comments/:id/like` — Yorum beğenme
* `DELETE /v1/comments/:id/like` — Yorum beğenisini geri çekme

**Mobil İyileştirmeler:**
- Yorumlar için pagination
- Push notification (yeni yorum geldiğinde)

### 3. Beğeni (Like) API
* `POST /v1/posts/:id/like` — Gönderi beğenme
* `DELETE /v1/posts/:id/like` — Beğeni geri çekme

**Mobil İyileştirmeler:**
- Optimistic UI güncellemesi desteği
- Beğeni sayısı WebSocket ile real-time güncelleme (gelecek)

## Yeni Entegrasyonlar

### RabbitMQ Bildirim Sistemi
- `createPollutionReport` → Bildirim kuyruğuna mesaj gönderme
- Producer/Consumer pattern ile asenkron bildirim işleme
- Fallback: RabbitMQ yoksa doğrudan MongoDB'ye kayıt

### Redis Cache
- `GET /v1/pollution-reports` → 5 dakika TTL ile cache
- Cache invalidation: Yeni rapor oluşturulduğunda cache temizleme

## Controller Dosyaları
- `backend/controllers/pollutionController.js`
- `backend/controllers/commentController.js`
- `backend/controllers/likeController.js`

## Route Dosyaları
- `backend/routes/pollutionRoutes.js`
- `backend/routes/commentRoutes.js`
- `backend/routes/likeRoutes.js`

## Model Dosyaları
- `backend/models/PollutionReport.js`
- `backend/models/Comment.js`
- `backend/models/CommentLike.js`
- `backend/models/Like.js`
- `backend/models/Notification.js` (yeni)
