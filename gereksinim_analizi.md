# Temizİz - Gereksinim Analizi

Bu sayfada Temizİz projesi için belirlenen toplam 16 adet fonksiyonel gereksinim, takım üyeleri arasında eşit olarak (8'er adet) paylaştırılmıştır. Her üyenin görev dağılımında en az bir adet POST (Ekle), GET (Listele), PUT (Güncelle) ve DELETE (Sil) işlemi bulunmaktadır.

## Kişi 1: Ahmet Kağan Karababa
1. **Kullanıcı Kayıt Olma (Ekle/POST):** Sisteme yeni katılmak isteyen kişilerin ad, soyad ve e-posta bilgileriyle hesap oluşturması.
2. **Profil Bilgilerini Görüntüleme (Listele/GET):** Kullanıcının kendi profilindeki puanını ve geçmişte temizlediği alanları görmesi.
3. **Profil Bilgilerini Güncelleme (Güncelle/PUT):** Kullanıcının şifre veya profil fotoğrafı gibi kişisel bilgilerini değiştirmesi.
4. **Hesap Silme (Sil/DELETE):** Sistemi kullanmak istemeyen kullanıcının kendi hesabını kalıcı olarak kapatması.
5. **Kirli Alan Bildirme (Ekle/POST):** Kullanıcının doğada gördüğü kirli bir alanın fotoğrafını sisteme yükleyerek bildirmesi.
6. **Bildirilen Alanı Güncelleme (Güncelle/PUT):** Kullanıcının yanlış girdiği bir kirli alan konumunu veya açıklamasını sonradan düzeltmesi.
7. **Liderlik Tablosunu Listeleme (Listele/GET):** En çok çevre temizliği yapıp en yüksek puanı toplayan kullanıcıların sıralı bir şekilde görülmesi.
8. **Uygunsuz İçeriği Şikayet Etme (Ekle/POST):** Kullanıcının, platforma yüklenen ve doğa temizliği ile alakası olmayan sahte veya uygunsuz fotoğrafları sistem yöneticilerine bildirmesi.

---

## Kişi 2: Tuğçe Ak
9. **Temizlik Sonrası Fotoğraf Yükleme (Ekle/POST):** Kullanıcının temizlediği alanın son halinin fotoğrafını kanıt olarak sisteme eklemesi.
10. **Kirli Alanları Listeleme (Listele/GET):** Sistemdeki tüm temizlenmeyi bekleyen kirli alanların kullanıcılar tarafından görülmesi.
11. **Hatalı Fotoğrafı Silme (Sil/DELETE):** Kullanıcının yanlışlıkla yüklediği bir doğa fotoğrafını sistemden kaldırması.
12. **Görev Durumunu Güncelleme (Güncelle/PUT):** Bir kirli alanın durumunun "Temizlenmeyi Bekliyor" halinden "Temizlendi" statüsüne geçirilmesi.
13. **Temizlenen Alana Yorum Yapma (Ekle/POST):** Kullanıcıların başarıyla temizlenmiş bir bölgenin altına tebrik veya bilgi amaçlı mesaj yazması.
14. **Yorumları Listeleme (Listele/GET):** Temizlenen bir alanın altına yapılan tüm kullanıcı yorumlarının sırasıyla okunabilmesi.
15. **Uygunsuz Yorumu Silme (Sil/DELETE):** Topluluk kurallarına uymayan veya hakaret içeren bir yorumun sistemden kaldırılması.
16. **Kullanıcı Puanını Güncelleme (Güncelle/PUT):** Bir alan başarıyla temizlenip onaylandıktan sonra, temizliği yapan kullanıcının toplam puanının artırılması.
