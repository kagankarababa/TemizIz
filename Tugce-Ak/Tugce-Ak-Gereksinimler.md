# Tuğçe Ak'ın Gereksinimleri

## 1. Temizlik Fotoğrafı Yükleme
* **API Metodu:** POST /clean-reports
* **Açıklama:** Kullanıcının temizlediği alanın son halini kanıt olarak sisteme yüklemesini sağlar.

## 2. Gönderi Silme
* **API Metodu:** DELETE /pollution-reports/:id
* **Açıklama:** Kullanıcının daha önce paylaştığı bir gönderiyi ilişkili temizlik raporları, yorumlar ve beğenileriyle birlikte kalıcı olarak silmesini sağlar.

## 3. Temizlenen Alana Yorum Yapma
* **API Metodu:** POST /comments
* **Açıklama:** Kullanıcıların temizlenmiş bir bölgenin altına bilgi amaçlı mesaj yazmasını sağlar.

## 4. Yorumları Listeleme
* **API Metodu:** GET /comments/:taskId
* **Açıklama:** Temizlenen bir alanın altına yapılan tüm kullanıcı yorumlarının okunabilmesini sağlar.

## 5. Yorumu Beğenme
* **API Metodu:** POST /comments/:id/like
* **Açıklama:** Kullanıcıların beğendikleri yorumları beğenmesini sağlar.

## 6. Yorum Beğenisini Geri Çekme
* **API Metodu:** DELETE /comments/:id/like
* **Açıklama:** Kullanıcının yanlışlıkla veya artık istemediği bir yorum beğenisini geri çekmesini sağlar.

## 7. Yoruma Yanıt Verme
* **API Metodu:** POST /comments (parentId ile)
* **Açıklama:** Kullanıcıların mevcut bir yoruma yanıt yazarak iç içe yorum ağacı oluşturmasını sağlar.

## 8. Kullanıcı Puanını Güncelleme
* **API Metodu:** PUT /users/:id/points
* **Açıklama:** Alan başarıyla temizlenip onaylandıktan sonra kullanıcının puanının artırılmasını sağlar.

## 9. Gönderiyi Beğenme
* **API Metodu:** POST /posts/:id/like
* **Açıklama:** Kullanıcıların beğendikleri temizlik gönderilerini beğenmesini ve böylece gönderi sahibinin liderlik tablosundaki sıralamasına katkı sağlamasını sağlar.

## 10. Beğeniyi Geri Çekme
* **API Metodu:** DELETE /posts/:id/like
* **Açıklama:** Kullanıcının yanlışlıkla veya artık istemediği bir beğeniyi geri çekmesini sağlar.