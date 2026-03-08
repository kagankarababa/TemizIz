# Tuğçe Ak'ın REST API Metotları

API Test Videosu: [Link buraya eklenecek]

## 1. Temizlik Sonrası Fotoğraf Yükleme
* **Endpoint:** `POST /clean-reports`
* **Request Body:** `{"taskId": "rep123", "imageUrl": "https://temiziz.com/uploads/temizlendi.jpg"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 2. Hatalı Fotoğrafı Silme
* **Endpoint:** `DELETE /clean-reports/{id}`
* **Authentication:** Bearer Token gerekli
* **Response:** `204 No Content`

## 3. Görev Durumunu Güncelleme
* **Endpoint:** `PUT /tasks/{id}/status`
* **Request Body:** `{"status": "Temizlendi"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 4. Kullanıcı Puanını Güncelleme
* **Endpoint:** `PUT /users/{id}/points`
* **Request Body:** `{"pointsToAdd": 50}`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 5. Uygunsuz İçeriği Şikayet Etme
* **Endpoint:** `POST /reports/abuse`
* **Request Body:** `{"targetId": "cmt456", "reason": "Küfürlü içerik barındırıyor."}`
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 6. Temizlenen Alana Yorum Yapma
* **Endpoint:** `POST /comments`
* **Request Body:** `{"taskId": "rep123", "text": "Harika bir iş çıkarmışsınız, elinize sağlık!"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 7. Yorumları Listeleme
* **Endpoint:** `GET /comments/{taskId}`
* **Authentication:** Gerekli değil
* **Response:** `200 OK`

## 8. Uygunsuz Yorumu Silme
* **Endpoint:** `DELETE /comments/{id}`
* **Authentication:** Bearer Token gerekli
* **Response:** `204 No Content`