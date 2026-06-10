# Tuğçe Ak - Mobil Frontend Görevleri

## Genel Bilgi
Capacitor kullanılarak React tabanlı web uygulamasının Android mobil uygulamaya dönüştürülmesi.

## Sorumluluk Alanları

### 1. Giriş Sayfası (Login)
* **Dosya:** `frontend/src/pages/Login.jsx`
* **Açıklama:** E-posta ve şifre ile giriş.
* **Mobil Uyumluluk Gereksinimleri:**
  - Mobil klavye açıldığında form kaydırma
  - Biyometrik giriş desteği (parmak izi / yüz tanıma) — gelecek
  - "Beni hatırla" özelliği (Capacitor Preferences API)
  - Şifre göster/gizle toggle
  - Auto-fill desteği

### 2. Kayıt Sayfası (Register)
* **Dosya:** `frontend/src/pages/Register.jsx`
* **Açıklama:** Yeni kullanıcı kaydı.
* **Mobil Uyumluluk Gereksinimleri:**
  - Form validasyonu (gerçek zamanlı)
  - Şifre güçlülük göstergesi
  - Mobil klavye tipine göre input type ayarlama

### 3. Profil Sayfası (Profile)
* **Dosya:** `frontend/src/pages/Profile.jsx`
* **Açıklama:** Kendi profil bilgilerini görüntüleme ve düzenleme.
* **Mobil Uyumluluk Gereksinimleri:**
  - Profil fotoğrafı değiştirme (Capacitor Camera API)
  - Profil bilgileri düzenleme (inline edit)
  - Kullanıcının gönderilerini listeleme (lazy load)
  - Hesap silme onay dialogu (native alert)

### 4. Kullanıcı Profili (UserProfile)
* **Dosya:** `frontend/src/pages/UserProfile.jsx`
* **Açıklama:** Başka kullanıcıların profillerini görüntüleme.
* **Mobil Uyumluluk:** Profil kartı tasarımı, gönderi grid görünümü

### 5. Liderlik Tablosu (Leaderboard)
* **Dosya:** `frontend/src/pages/Leaderboard.jsx`
* **Açıklama:** En yüksek beğenili kullanıcıları sıralama.
* **Mobil Uyumluluk Gereksinimleri:**
  - Pull-to-refresh
  - Animasyonlu sıralama geçişleri
  - İlk 3 kullanıcı için özel madalya tasarımı
  - Kullanıcıya tıklayınca profil sayfasına gitme

## Capacitor Eklentileri
- `@capacitor/camera` — Profil fotoğrafı çekme
- `@capacitor/preferences` — Token ve kullanıcı bilgisi saklama
- `@capacitor/dialog` — Native onay dialogları
- `@capacitor/keyboard` — Klavye yönetimi
- `@capacitor/status-bar` — Durum çubuğu özelleştirme
