# Ahmet Kağan Karababa'nın Gereksinimleri

## 1. Kullanıcı Kayıt Olma
* **API Metodu:** POST /auth/register
* **Açıklama:** Sisteme yeni katılmak isteyen kullanıcıların ad, soyad ve e-posta bilgileriyle hesap oluşturmasını sağlar.

## 2. Kullanıcı Giriş Yapma
* **API Metodu:** POST /auth/login
* **Açıklama:** Kayıtlı kullanıcıların e-posta ve şifreleriyle sisteme giriş yaparak oturum açmasını sağlar.

## 3. Profil Bilgilerini Görüntüleme
* **API Metodu:** GET /profile
* **Açıklama:** Kullanıcının kendi profilindeki toplam beğenisini ve geçmişte paylaştığı temizlik gönderilerini görmesini sağlar.

## 4. Profil Bilgilerini Güncelleme
* **API Metodu:** PUT /profile
* **Açıklama:** Kullanıcının ad, e-posta veya şifre gibi kişisel bilgilerini değiştirmesini sağlar.

## 5. Hesap Silme
* **API Metodu:** DELETE /profile
* **Açıklama:** Kullanıcının sistemdeki tüm verilerini ve hesabını kalıcı olarak silmesini sağlar.

## 6. Gönderi Düzenleme
* **API Metodu:** PUT /pollution-reports/:id
* **Açıklama:** Kullanıcının daha önce paylaştığı bir gönderinin açıklamasını, konum adını veya fotoğrafını sonradan düzeltmesini sağlar.

## 7. Profil Fotoğrafı Olarak Avatar Seçme
* **API Metodu:** PUT /profile
* **Açıklama:** Kullanıcının emoji tabanlı avatarlar arasından birini seçerek profil fotoğrafı olarak ayarlamasını sağlar.

## 8. Liderlik Tablosunu Listeleme
* **API Metodu:** GET /leaderboard
* **Açıklama:** En çok beğeni toplayan kullanıcıların sıralı listesini sunar.
