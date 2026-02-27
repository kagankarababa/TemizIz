# Gereksinim Analizi

Tüm gereksinimler çıkarılmış, takım üyeleri arasında tartışılmış ve son gereksinimlerin isimleri, hangi API metoduna karşılık geleceği ve kısa açıklamaları aşağıda numaralı bir şekilde listelenmiştir.

## Tüm Gereksinimler

### Ahmet Kağan Karababa'nın Gereksinimleri

1. **Kullanıcı Kayıt Olma**
   * **API Metodu:** POST /auth/register
   * **Açıklama:** Sisteme yeni katılmak isteyen kullanıcıların ad, soyad ve e-posta bilgileriyle hesap oluşturmasını sağlar.

2. **Profil Bilgilerini Görüntüleme**
   * **API Metodu:** GET /profile
   * **Açıklama:** Kullanıcının kendi profilindeki toplam puanını ve geçmişte tamamladığı temizlik görevlerini görmesini sağlar.

3. **Profil Bilgilerini Güncelleme**
   * **API Metodu:** PUT /profile
   * **Açıklama:** Kullanıcının şifre veya profil fotoğrafı gibi kişisel bilgilerini değiştirmesini sağlar.

4. **Hesap Silme**
   * **API Metodu:** DELETE /profile
   * **Açıklama:** Kullanıcının sistemdeki tüm verilerini ve hesabını kalıcı olarak silmesini sağlar.

5. **Kirli Alan Bildirme**
   * **API Metodu:** POST /pollution-reports
   * **Açıklama:** Kullanıcının doğada gördüğü kirli bir alanın fotoğrafını ve koordinatlarını sisteme yükleyerek bildirmesini sağlar.

6. **Bildirilen Alanı Güncelleme**
   * **API Metodu:** PUT /pollution-reports/:id
   * **Açıklama:** Kullanıcının yanlış girdiği bir kirli alan konumunu veya açıklamasını sonradan düzeltmesini sağlar.

7. **Liderlik Tablosunu Listeleme**
   * **API Metodu:** GET /leaderboard
   * **Açıklama:** En çok çevre temizliği yapıp en yüksek puanı toplayan kullanıcıların sıralı listesini sunar.

8. **Uygunsuz İçeriği Şikayet Etme**
   * **API Metodu:** POST /reports/abuse
   * **Açıklama:** Kullanıcıların platforma yüklenen sahte veya uygunsuz içerikleri yöneticilere bildirmesini sağlar.

### Tuğçe Ak'ın Gereksinimleri

9. **Temizlik Sonrası Fotoğraf Yükleme**
   * **API Metodu:** POST /clean-reports
   * **Açıklama:** Kullanıcının temizlediği alanın son halini kanıt olarak sisteme yüklemesini sağlar.

10. **Kirli Alanları Listeleme**
    * **API Metodu:** GET /pollution-reports
    * **Açıklama:** Temizlenmeyi bekleyen tüm kirli alanların kullanıcılar tarafından görülmesini sağlar.

11. **Hatalı Fotoğrafı Silme**
    * **API Metodu:** DELETE /clean-reports/:id
    * **Açıklama:** Kullanıcının yanlışlıkla yüklediği bir doğa fotoğrafını sistemden kaldırmasını sağlar.

12. **Görev Durumunu Güncelleme**
    * **API Metodu:** PUT /tasks/:id/status
    * **Açıklama:** Bir kirli alanın durumunun "Bekliyor"dan "Temizlendi" statüsüne geçirilmesini sağlar.

13. **Temizlenen Alana Yorum Yapma**
    * **API Metodu:** POST /comments
    * **Açıklama:** Kullanıcıların temizlenmiş bir bölgenin altına bilgi amaçlı mesaj yazmasını sağlar.

14. **Yorumları Listeleme**
    * **API Metodu:** GET /comments/:taskId
    * **Açıklama:** Temizlenen bir alanın altına yapılan tüm kullanıcı yorumlarının okunabilmesini sağlar.

15. **Uygunsuz Yorumu Silme**
    * **API Metodu:** DELETE /comments/:id
    * **Açıklama:** Topluluk kurallarına uymayan veya yanlış yazılan bir yorumun sistemden kaldırılmasını sağlar.

16. **Kullanıcı Puanını Güncelleme**
    * **API Metodu:** PUT /users/:id/points
    * **Açıklama:** Alan başarıyla temizlenip onaylandıktan sonra kullanıcının puanının artırılmasını sağlar.

## Gereksinim Dağılımları

## Gereksinim Dağılımları

* [Ahmet Kağan Karababa'nın Gereksinimleri](Ahmet-Kagan-Karababa/Ahmet-Kagan-Karababa-Gereksinimler.md)
* [Tuğçe Ak'ın Gereksinimleri](Tugce-Ak/Tugce-Ak-Gereksinimler.md)