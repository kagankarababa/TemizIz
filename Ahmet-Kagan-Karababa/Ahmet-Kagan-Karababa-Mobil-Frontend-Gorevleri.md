# Ahmet Kağan Karababa - Mobil Frontend Görevleri

## Genel Bilgi
Capacitor kullanılarak React tabanlı web uygulamasının Android mobil uygulamaya dönüştürülmesi.

## Sorumluluk Alanları

### 1. Ana Sayfa / Keşfet Akışı (Home)
* **Dosya:** `frontend/src/pages/Home.jsx`
* **Açıklama:** Instagram keşfet benzeri gönderi akışını sağlayan ana sayfa.
* **Mobil Uyumluluk Gereksinimleri:**
  - Responsive grid düzeni (tek sütun mobil görünüm)
  - Touch-friendly kart bileşenleri
  - Pull-to-refresh desteği
  - Infinite scroll optimizasyonu
  - Mobil ağ durumuna göre resim kalitesi ayarlama

### 2. Gönderi Oluşturma Sayfası (CreatePost)
* **Dosya:** `frontend/src/pages/CreatePost.jsx`
* **Açıklama:** Kirlilik bildirimi oluşturma sayfası.
* **Mobil Uyumluluk Gereksinimleri:**
  - Capacitor Camera API ile cihaz kamerasından fotoğraf çekme
  - Cihaz galerisinden fotoğraf seçme
  - GPS konum bilgisi otomatik alma (Capacitor Geolocation)
  - Dosya boyutu sıkıştırma (mobil veri tasarrufu)
  - Offline mod: Ağ yokken taslak kaydetme

### 3. Gönderi Detay Sayfası (PostDetail)
* **Dosya:** `frontend/src/pages/PostDetail.jsx`
* **Açıklama:** Tek gönderi detayı, yorum ve beğeni.
* **Mobil Uyumluluk Gereksinimleri:**
  - Before/After fotoğraf geçişi (swipe gesture)
  - Yorum bölümü scroll optimizasyonu
  - Beğeni animasyonu (haptic feedback)
  - Paylaşma özelliği (Capacitor Share API)

### 4. Gönderi Kartı Bileşeni (PostCard)
* **Dosya:** `frontend/src/components/PostCard.jsx`
* **Mobil Uyumluluk:** Touch target boyutları (min 44x44px), lazy image loading

### 5. Yorum Bölümü (CommentSection)
* **Dosya:** `frontend/src/components/CommentSection.jsx`
* **Mobil Uyumluluk:** Soft keyboard açıldığında scroll ayarlama, swipe-to-delete

### 6. Beğeni Butonu (LikeButton)
* **Dosya:** `frontend/src/components/LikeButton.jsx`
* **Mobil Uyumluluk:** Dokunma animasyonu, çift tıklama koruması

### 7. Navbar
* **Dosya:** `frontend/src/components/Navbar.jsx`
* **Mobil Uyumluluk:** Hamburger menü, bottom navigation bar alternatifi

### 8. Auth Context ve Hooks
* **Dosyalar:** `frontend/src/context/AuthContext.jsx`, `frontend/src/hooks/useAuth.js`
* **Mobil Uyumluluk:** Capacitor Preferences API ile token saklama (localStorage yerine)

## Capacitor Eklentileri
- `@capacitor/camera` — Fotoğraf çekme/seçme
- `@capacitor/geolocation` — GPS konum
- `@capacitor/share` — İçerik paylaşma
- `@capacitor/haptics` — Dokunmatik geri bildirim
- `@capacitor/preferences` — Güvenli veri saklama
- `@capacitor/network` — Ağ durumu kontrolü
