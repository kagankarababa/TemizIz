# Ahmet Kağan Karababa'nın REST API Metotları

API Test Videosu: [Link buraya eklenecek]

## 1. Kullanıcı Kayıt Olma
* **Endpoint:** `POST /auth/register`
* **Request Body:** `{"fullName": "Ahmet Kağan", "email": "kullanici@example.com", "password": "123"}`
* **Authentication:** Gerekli değil
* **Response:** `201 Created`

## 2. Profil Bilgilerini Görüntüleme
* **Endpoint:** `GET /profile`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 3. Profil Bilgilerini Güncelleme
* **Endpoint:** `PUT /profile`
* **Request Body:** `{"fullName": "Ahmet Kağan Karababa", "password": "Yenisifre123"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 4. Hesap Silme
* **Endpoint:** `DELETE /profile`
* **Authentication:** Bearer Token gerekli
* **Response:** `204 No Content`

## 5. Kirli Alan Bildirme
* **Endpoint:** `POST /pollution-reports`
* **Request Body:** `{"lat": 37.77, "long": 35.32, "imageUrl": "link.jpg", "description": "Çöp var"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `201 Created`

## 6. Kirli Alanları Listeleme
* **Endpoint:** `GET /pollution-reports`
* **Authentication:** Gerekli değil
* **Response:** `200 OK`

## 7. Bildirilen Alanı Güncelleme
* **Endpoint:** `PUT /pollution-reports/{id}`
* **Request Body:** `{"lat": 37.78, "long": 35.33, "imageUrl": "yenilink.jpg"}`
* **Authentication:** Bearer Token gerekli
* **Response:** `200 OK`

## 8. Liderlik Tablosunu Listeleme
* **Endpoint:** `GET /leaderboard`
* **Authentication:** Gerekli değil
* **Response:** `200 OK`