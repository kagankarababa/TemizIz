# Ahmet Kağan Karababa'nın Web Frontend Görevleri

## 1. Kayıt Sayfası (Register)
* **Dosya:** `frontend/src/pages/Register.jsx`
* **Açıklama:** Kullanıcıların ad-soyad, e-posta ve şifre bilgileriyle yeni hesap oluşturmasını sağlayan sayfa.
* **Özellikler:**
  - Form validasyonu (şifre min. 6 karakter, şifre eşleşme kontrolü)
  - Hata mesajları gösterimi
  - Başarılı kayıt sonrası otomatik yönlendirme

## 2. Giriş Sayfası (Login)
* **Dosya:** `frontend/src/pages/Login.jsx`
* **Açıklama:** Kayıtlı kullanıcıların e-posta ve şifre ile giriş yapmasını sağlayan sayfa.
* **Özellikler:**
  - JWT token yönetimi (localStorage)
  - Hata mesajları gösterimi
  - Kayıt sayfasına yönlendirme linki

## 3. Profil Sayfası
* **Dosya:** `frontend/src/pages/Profile.jsx`
* **Açıklama:** Kullanıcının kendi profil bilgilerini görüntüleme, düzenleme ve hesabını silme işlemlerini gerçekleştirdiği sayfa.
* **Özellikler:**
  - Profil bilgileri görüntüleme (ad, e-posta, toplam beğeni, puan)
  - Profil düzenleme formu
  - Hesap silme onay mekanizması

## 4. Gönderi Oluşturma Sayfası
* **Dosya:** `frontend/src/pages/CreatePost.jsx`
* **Açıklama:** Kullanıcının kirli alan (önce) ve temizlenmiş alan (sonra) fotoğraflarını cihaz hafızasından yükleyerek konum adıyla birlikte paylaşmasını sağlayan sayfa.
* **Özellikler:**
  - Cihaz hafızasından fotoğraf yükleme (file picker)
  - Yüklenen fotoğrafın önizlemesi
  - Konum adı girişi
  - Açıklama alanı
  - multipart/form-data ile backend'e gönderim

## 5. Liderlik Tablosu Sayfası
* **Dosya:** `frontend/src/pages/Leaderboard.jsx`
* **Açıklama:** Toplam beğeni sayısına göre kullanıcıların sıralandığı liderlik tablosunu gösteren sayfa.
* **Özellikler:**
  - İlk 3 kullanıcı için madalya gösterimi (🥇🥈🥉)
  - Kullanıcı avatarları
  - Toplam beğeni sayısı gösterimi

## 6. Navbar Bileşeni
* **Dosya:** `frontend/src/components/Navbar.jsx`
* **Açıklama:** Tüm sayfalarda görünen navigasyon çubuğu.
* **Özellikler:**
  - Temizİz logo ve marka
  - Keşfet, Liderlik, Profil linkleri
  - Giriş durumuna göre dinamik butonlar
  - Glassmorphism tasarım

## 7. Auth Context ve Hooks
* **Dosyalar:** `frontend/src/context/AuthContext.jsx`, `frontend/src/hooks/useAuth.js`
* **Açıklama:** Kullanıcı oturum yönetimi altyapısı.
* **Özellikler:**
  - JWT token yönetimi
  - Login/Register/Logout fonksiyonları
  - Kullanıcı state'inin global yönetimi
