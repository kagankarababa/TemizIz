# Tuğçe Ak'ın Web Frontend Görevleri

Front-End test videosu

## 1. Ana Sayfa / Keşfet Akışı
* **Dosya:** `frontend/src/pages/Home.jsx`
* **Açıklama:** Instagram keşfet benzeri gönderi akışını sağlayan ana sayfa.
* **Özellikler:**
  - Gönderi kartlarının grid düzeninde listelenmesi
  - Before/After fotoğraf gösterimi
  - Boş durum mesajı

## 2. Gönderi Detay Sayfası
* **Dosya:** `frontend/src/pages/PostDetail.jsx`
* **Açıklama:** Tek bir gönderinin detaylı görünümünü, before/after karşılaştırmasını, yorumları ve beğeni işlevini sunan sayfa.
* **Özellikler:**
  - Before/After fotoğraf toggle
  - Konum bilgisi gösterimi
  - Beğeni ve yorum bölümü
  - Gönderi açıklaması

## 3. Gönderi Kartı Bileşeni (PostCard)
* **Dosya:** `frontend/src/components/PostCard.jsx`
* **Açıklama:** Her gönderinin feed'de gösterilen kart görünümü.
* **Özellikler:**
  - Before/After fotoğraf slider (toggle butonları)
  - Kullanıcı avatarı ve adı
  - Konum etiketi
  - Durum göstergesi (Bekliyor / Temizlendi)
  - Beğeni ve yorum butonları

## 4. Beğeni Butonu Bileşeni (LikeButton)
* **Dosya:** `frontend/src/components/LikeButton.jsx`
* **Açıklama:** Gönderilere beğeni atma ve geri çekme işlevini sağlayan bileşen.
* **Özellikler:**
  - Optimistic UI güncellemesi
  - Toggle (beğen/geri çek) mekanizması
  - Beğeni sayısı gösterimi
  - Giriş kontrolü

## 5. Yorum Bölümü Bileşeni (CommentSection)
* **Dosya:** `frontend/src/components/CommentSection.jsx`
* **Açıklama:** Gönderi detayında yorumları listeleme, ekleme ve silme işlevlerini sağlayan bileşen.
* **Özellikler:**
  - Yorum listesi (kullanıcı adı, tarih, metin)
  - Yorum ekleme formu
  - Kendi yorumunu silme
  - Real-time güncelleme

## 6. API İstemcisi (Axios)
* **Dosya:** `frontend/src/api/axios.js`
* **Açıklama:** Backend ile iletişimi sağlayan HTTP istemcisi yapılandırması.
* **Özellikler:**
  - Base URL yapılandırması
  - JWT token interceptor
  - 401 hatasında otomatik çıkış
