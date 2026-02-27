# Tuğçe Ak - Gereksinim Analizi

Temizİz projesi kapsamında benim sorumluluğumda olan 8 adet fonksiyonel gereksinim aşağıdadır:

1. **Temizlik Sonrası Fotoğraf Yükleme (Ekle/POST):** Kullanıcının temizlediği alanın son halinin fotoğrafını kanıt olarak sisteme eklemesi.
2. **Kirli Alanları Listeleme (Listele/GET):** Sistemdeki tüm temizlenmeyi bekleyen kirli alanların kullanıcılar tarafından görülmesi.
3. **Hatalı Fotoğrafı Silme (Sil/DELETE):** Kullanıcının yanlışlıkla yüklediği bir doğa fotoğrafını sistemden kaldırması.
4. **Görev Durumunu Güncelleme (Güncelle/PUT):** Bir kirli alanın durumunun "Temizlenmeyi Bekliyor" halinden "Temizlendi" statüsüne geçirilmesi.
5. **Temizlenen Alana Yorum Yapma (Ekle/POST):** Kullanıcıların başarıyla temizlenmiş bir bölgenin altına tebrik veya bilgi amaçlı mesaj yazması.
6. **Yorumları Listeleme (Listele/GET):** Temizlenen bir alanın altına yapılan tüm kullanıcı yorumlarının sırasıyla okunabilmesi.
7. **Uygunsuz Yorumu Silme (Sil/DELETE):** Topluluk kurallarına uymayan veya hakaret içeren bir yorumun sistemden kaldırılması.
8. **Kullanıcı Puanını Güncelleme (Güncelle/PUT):** Bir alan başarıyla temizlenip onaylandıktan sonra, temizliği yapan kullanıcının toplam puanının artırılması.