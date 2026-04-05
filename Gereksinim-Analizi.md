# Gereksinim Analizi

Tüm gereksinimler çıkarılmış, takım üyeleri arasında tartışılmış ve son gereksinimlerin isimleri, hangi API metoduna karşılık geleceği ve kısa açıklamaları aşağıda numaralı bir şekilde listelenmiştir.

## Tüm Gereksinimler

### Ahmet Kağan Karababa'nın Gereksinimleri

1. **Kullanıcı Kayıt Olma**
   * **API Metodu:** POST /auth/register
   * **Açıklama:** Sisteme yeni katılmak isteyen kullanıcıların ad, soyad ve e-posta bilgileriyle hesap oluşturmasını sağlar.

2. **Kullanıcı Giriş Yapma**
   * **API Metodu:** POST /auth/login
   * **Açıklama:** Kayıtlı kullanıcıların e-posta ve şifreleriyle sisteme giriş yaparak oturum açmasını sağlar.

3. **Profil Bilgilerini Görüntüleme**
   * **API Metodu:** GET /profile
   * **Açıklama:** Kullanıcının kendi profilindeki toplam beğenisini ve geçmişte paylaştığı temizlik gönderilerini görmesini sağlar.

4. **Profil Bilgilerini Güncelleme**
   * **API Metodu:** PUT /profile
   * **Açıklama:** Kullanıcının ad, e-posta veya şifre gibi kişisel bilgilerini değiştirmesini sağlar.

5. **Hesap Silme**
   * **API Metodu:** DELETE /profile
   * **Açıklama:** Kullanıcının sistemdeki tüm verilerini ve hesabını kalıcı olarak silmesini sağlar.

6. **Gönderi Düzenleme**
   * **API Metodu:** PUT /pollution-reports/:id
   * **Açıklama:** Kullanıcının daha önce paylaştığı bir gönderinin açıklamasını, konum adını veya fotoğrafını sonradan düzeltmesini sağlar.

7. **Profil Fotoğrafı Olarak Avatar Seçme**
   * **API Metodu:** PUT /profile
   * **Açıklama:** Kullanıcının emoji tabanlı avatarlar arasından birini seçerek profil fotoğrafı olarak ayarlamasını sağlar.

8. **Liderlik Tablosunu Listeleme**
   * **API Metodu:** GET /leaderboard
   * **Açıklama:** En çok beğeni toplayan kullanıcıların sıralı listesini sunar.

### Tuğçe Ak'ın Gereksinimleri

9. **Temizlik Fotoğrafı Yükleme**
    * **API Metodu:** POST /clean-reports
    * **Açıklama:** Kullanıcının temizlediği alanın son halini kanıt olarak sisteme yüklemesini sağlar.

10. **Gönderi Silme**
    * **API Metodu:** DELETE /pollution-reports/:id
    * **Açıklama:** Kullanıcının daha önce paylaştığı bir gönderiyi ilişkili temizlik raporları, yorumlar ve beğenileriyle birlikte kalıcı olarak silmesini sağlar.

11. **Temizlenen Alana Yorum Yapma**
    * **API Metodu:** POST /comments
    * **Açıklama:** Kullanıcıların temizlenmiş bir bölgenin altına bilgi amaçlı mesaj yazmasını sağlar.

12. **Yorumları Listeleme**
    * **API Metodu:** GET /comments/:taskId
    * **Açıklama:** Temizlenen bir alanın altına yapılan tüm kullanıcı yorumlarının okunabilmesini sağlar.

13. **Yorumu Beğenme**
    * **API Metodu:** POST /comments/:id/like
    * **Açıklama:** Kullanıcıların beğendikleri yorumları beğenmesini sağlar.

14. **Yorum Beğenisini Geri Çekme**
    * **API Metodu:** DELETE /comments/:id/like
    * **Açıklama:** Kullanıcının yanlışlıkla veya artık istemediği bir yorum beğenisini geri çekmesini sağlar.

15. **Yoruma Yanıt Verme**
    * **API Metodu:** POST /comments (parentId ile)
    * **Açıklama:** Kullanıcıların mevcut bir yoruma yanıt yazarak iç içe yorum ağacı oluşturmasını sağlar.

16. **Kullanıcı Puanını Güncelleme**
    * **API Metodu:** PUT /users/:id/points
    * **Açıklama:** Alan başarıyla temizlenip onaylandıktan sonra kullanıcının puanının artırılmasını sağlar.

17. **Gönderiyi Beğenme**
    * **API Metodu:** POST /posts/:id/like
    * **Açıklama:** Kullanıcıların beğendikleri temizlik gönderilerini beğenmesini ve böylece gönderi sahibinin liderlik tablosundaki sıralamasına katkı sağlamasını sağlar.

18. **Beğeniyi Geri Çekme**
    * **API Metodu:** DELETE /posts/:id/like
    * **Açıklama:** Kullanıcının yanlışlıkla veya artık istemediği bir beğeniyi geri çekmesini sağlar.

## Gereksinim Dağılımları

* [Ahmet Kağan Karababa'nın Gereksinimleri](Ahmet-Kagan-Karababa/Ahmet-Kagan-Karababa-Gereksinimler.md)
* [Tuğçe Ak'ın Gereksinimleri](Tugce-Ak/Tugce-Ak-Gereksinimler.md)