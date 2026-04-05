# Tuğçe Ak'ın REST API Metotları

API Test Videosu: [Link buraya eklenecek]

## 1. Temizlik Fotoğrafı Yükleme
* **Endpoint:** `POST /clean-reports`
* **Content-Type:** `multipart/form-data`
* **Form Data:**
  - `image` (file): Temizlenmiş alanın fotoğrafı (JPEG, PNG, WebP — max 10MB)
  - `pollutionReportId` (text): İlgili kirli alan bildiriminin ID'si
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 2. Gönderi Silme
* **Endpoint:** `DELETE /pollution-reports/{id}`
* **Authentication:** Bearer Token gerekli
* **Response:** `204 No Content`

## 3. Temizlenen Alana Yorum Yapma
* **Endpoint:** `POST /comments`
* **Request Body:** `{"postId": "rep123", "text": "Harika bir iş çıkarmışsınız!"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 4. Yorumları Listeleme
* **Endpoint:** `GET /comments/{taskId}`
* **Authentication:** Gerekli değil
* **Response:** `200 OK`

## 5. Yorumu Beğenme
* **Endpoint:** `POST /comments/{id}/like`
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 6. Yorum Beğenisini Geri Çekme
* **Endpoint:** `DELETE /comments/{id}/like`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 7. Yoruma Yanıt Verme
* **Endpoint:** `POST /comments`
* **Request Body:** `{"postId": "rep123", "text": "Katılıyorum, çok güzel olmuş!", "parentId": "comment123"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 8. Kullanıcı Puanını Güncelleme
* **Endpoint:** `PUT /users/{id}/points`
* **Request Body:** `{"pointsToAdd": 50}`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 9. Gönderiyi Beğenme
* **Endpoint:** `POST /posts/{id}/like`
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 10. Beğeniyi Geri Çekme
* **Endpoint:** `DELETE /posts/{id}/like`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`