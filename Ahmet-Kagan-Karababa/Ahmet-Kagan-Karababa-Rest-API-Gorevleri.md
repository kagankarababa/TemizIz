# Ahmet Kağan Karababa'nın REST API Metotları

API Test Videosu: https://www.youtube.com/watch?v=g0GWCvaH3x4

## 1. Kullanıcı Kayıt Olma
* **Endpoint:** `POST /auth/register`
* **Request Body:** `{"fullName": "Ahmet Kağan", "email": "kullanici@example.com", "password": "123456"}`
* **Authentication:** Gerekli değil
* **Response:** `201 Created`

## 2. Kullanıcı Giriş Yapma
* **Endpoint:** `POST /auth/login`
* **Request Body:** `{"email": "kullanici@example.com", "password": "123456"}`
* **Authentication:** Gerekli değil
* **Response:** `200 OK`

## 3. Profil Bilgilerini Görüntüleme
* **Endpoint:** `GET /profile`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 4. Profil Bilgilerini Güncelleme
* **Endpoint:** `PUT /profile`
* **Request Body:** `{"fullName": "Ahmet Kağan Karababa", "password": "Yenisifre123"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 5. Hesap Silme
* **Endpoint:** `DELETE /profile`
* **Authentication:** Bearer Token gerekli
* **Response:** `204 No Content`

## 6. Gönderi Düzenleme
* **Endpoint:** `PUT /pollution-reports/{id}`
* **Content-Type:** `multipart/form-data`
* **Form Data:**
  - `image` (file, opsiyonel): Yeni fotoğraf
  - `description` (text, opsiyonel): Güncellenmiş açıklama
  - `locationName` (text, opsiyonel): Güncellenmiş konum adı
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 7. Profil Fotoğrafı Olarak Avatar Seçme
* **Endpoint:** `PUT /profile`
* **Request Body:** `{"profilePhoto": "🌿"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 8. Liderlik Tablosunu Listeleme
* **Endpoint:** `GET /leaderboard`
* **Authentication:** Gerekli değil
* **Response:** `200 OK`
