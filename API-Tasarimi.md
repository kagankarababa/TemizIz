# API Tasarımı - OpenAPI Specification

OpenAPI Spesifikasyon Dosyası: [temiziz.yaml](temiziz.yaml)

Bu doküman, OpenAPI Specification (OAS) 3.0.3 standardına göre hazırlanmış Temizİz projesinin tam API tasarımını içermektedir.

---

## OpenAPI Specification YAML İçeriği

```yaml
openapi: 3.0.3
info:
  title: Temizİz API
  version: 1.0.0
  description: >
    Doğayı Koru, İzini Temiz Bırak! Bu API, Temizİz platformunun kullanıcı yönetimi, 
    kirli alan bildirimleri, temizlik görevleri, liderlik tablosu ve topluluk yorumlarını yönetmesi için tasarlanmış RESTful bir servistir.
  contact:
    name: Ahmet Kağan Karababa
    email: ahmetkagankarababa@outlook.com

servers:
  - url: [https://api.temiziz.com/v1](https://api.temiziz.com/v1)
    description: Üretim sunucusu (Production)
  - url: http://localhost:3000/v1
    description: Yerel geliştirme sunucusu (Development)

tags:
  - name: Kimlik ve Profil
    description: Kullanıcı kayıt, profil görüntüleme ve hesap işlemleri
  - name: Kirli Alan Bildirimleri
    description: Doğadaki kirli alanların bildirilmesi ve listelenmesi
  - name: Temizlik ve Görevler
    description: Temizlenen alanların kanıtları, görev durumları ve puanlama
  - name: Topluluk
    description: Yorumlar, liderlik tablosu ve uygunsuz içerik şikayetleri

security:
  - BearerAuth: []

paths:
  /auth/register:
    post:
      tags:
        - Kimlik ve Profil
      summary: Kullanıcı Kayıt Olma
      operationId: registerUser
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterInput'
      responses:
        "201":
          description: Kullanıcı başarıyla oluşturuldu
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Profile'
        "400":
          description: Geçersiz istek verisi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /profile:
    get:
      tags:
        - Kimlik ve Profil
      summary: Profil Bilgilerini Görüntüleme
      operationId: getProfile
      responses:
        "200":
          description: Profil bilgileri başarıyla getirildi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Profile'
        "401":
          description: Kimlik doğrulama başarısız
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
    put:
      tags:
        - Kimlik ve Profil
      summary: Profil Bilgilerini Güncelleme
      operationId: updateProfile
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterInput'
      responses:
        "200":
          description: Profil başarıyla güncellendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Profile'
    delete:
      tags:
        - Kimlik ve Profil
      summary: Hesap Silme
      operationId: deleteProfile
      responses:
        "204":
          description: Hesap başarıyla silindi

  /pollution-reports:
    get:
      tags:
        - Kirli Alan Bildirimleri
      summary: Kirli Alanları Listeleme
      operationId: getPollutionReports
      security: []
      responses:
        "200":
          description: Temizlenmeyi bekleyen kirli alanlar listelendi
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PollutionReport'
    post:
      tags:
        - Kirli Alan Bildirimleri
      summary: Kirli Alan Bildirme
      operationId: createPollutionReport
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PollutionReportInput'
      responses:
        "201":
          description: Kirlilik bildirimi sisteme eklendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PollutionReport'

  /pollution-reports/{id}:
    put:
      tags:
        - Kirli Alan Bildirimleri
      summary: Bildirilen Alanı Güncelleme
      operationId: updatePollutionReport
      parameters:
        - name: id
          in: path
          required: true
          description: Kirli alanın benzersiz kimlik numarası
          schema:
            type: string
          example: "rep123"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PollutionReportInput'
      responses:
        "200":
          description: Bildirim başarıyla güncellendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PollutionReport'

  /clean-reports:
    post:
      tags:
        - Temizlik ve Görevler
      summary: Temizlik Sonrası Fotoğraf Yükleme
      operationId: createCleanReport
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CleanReportInput'
      responses:
        "201":
          description: Temizlik kanıtı başarıyla yüklendi

  /clean-reports/{id}:
    delete:
      tags:
        - Temizlik ve Görevler
      summary: Hatalı Fotoğrafı Silme
      operationId: deleteCleanReport
      parameters:
        - name: id
          in: path
          required: true
          description: Temizlik raporunun kimlik numarası
          schema:
            type: string
          example: "clr456"
      responses:
        "204":
          description: Fotoğraf başarıyla sistemden kaldırıldı

  /tasks/{id}/status:
    put:
      tags:
        - Temizlik ve Görevler
      summary: Görev Durumunu Güncelleme
      operationId: updateTaskStatus
      parameters:
        - name: id
          in: path
          required: true
          description: Görevin benzersiz kimlik numarası
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskStatusInput'
      responses:
        "200":
          description: Görev durumu güncellendi

  /users/{id}/points:
    put:
      tags:
        - Temizlik ve Görevler
      summary: Kullanıcı Puanını Güncelleme
      operationId: updateUserPoints
      parameters:
        - name: id
          in: path
          required: true
          description: Kullanıcının benzersiz kimlik numarası
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PointsInput'
      responses:
        "200":
          description: Kullanıcının puanı başarıyla artırıldı

  /leaderboard:
    get:
      tags:
        - Topluluk
      summary: Liderlik Tablosunu Listeleme
      operationId: getLeaderboard
      security: []
      responses:
        "200":
          description: En çok puan toplayan kullanıcılar sıralandı
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Profile'

  /reports/abuse:
    post:
      tags:
        - Topluluk
      summary: Uygunsuz İçeriği Şikayet Etme
      operationId: reportAbuse
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AbuseReportInput'
      responses:
        "201":
          description: Şikayet başarıyla alındı ve incelemeye gönderildi

  /comments:
    post:
      tags:
        - Topluluk
      summary: Temizlenen Alana Yorum Yapma
      operationId: addComment
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CommentInput'
      responses:
        "201":
          description: Yorum başarıyla eklendi
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Comment'

  /comments/{taskId}:
    get:
      tags:
        - Topluluk
      summary: Yorumları Listeleme
      operationId: getCommentsByTask
      parameters:
        - name: taskId
          in: path
          required: true
          description: Yorumların ait olduğu görevin ID'si
          schema:
            type: string
      responses:
        "200":
          description: Göreve ait tüm yorumlar listelendi
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Comment'

  /comments/{id}:
    delete:
      tags:
        - Topluluk
      summary: Uygunsuz Yorumu Silme
      operationId: deleteComment
      parameters:
        - name: id
          in: path
          required: true
          description: Silinecek yorumun ID'si
          schema:
            type: string
      responses:
        "204":
          description: Yorum başarıyla silindi

components:
  securitySchemes:
    BearerAuth:
      type: apiKey
      in: header
      name: Authorization
      description: 'JWT tabanlı kimlik doğrulama. İstek başlığına "Bearer <token>" eklenmeli.'

  schemas:
    RegisterInput:
      type: object
      description: Kullanıcı kayıt verisi
      required:
        - fullName
        - email
        - password
      properties:
        fullName:
          type: string
          description: Ad ve soyad
          example: "Ahmet Kağan"
        email:
          type: string
          description: E-posta adresi
          example: "kullanici@example.com"
        password:
          type: string
          description: Şifre
          example: "Guvenli123!"

    Profile:
      type: object
      description: Kullanıcı profili modeli
      properties:
        _id:
          type: string
          example: "usr789"
        fullName:
          type: string
          example: "Ahmet Kağan"
        points:
          type: integer
          description: Kullanıcının topladığı toplam temizlik puanı
          example: 250

    PollutionReportInput:
      type: object
      description: Kirli alan bildirim verisi
      required:
        - lat
        - long
        - imageUrl
      properties:
        lat:
          type: number
          format: float
          example: 37.7749
        long:
          type: number
          format: float
          example: 35.3213
        imageUrl:
          type: string
          example: "[https://temiziz.com/uploads/kirlialan.jpg](https://temiziz.com/uploads/kirlialan.jpg)"
        description:
          type: string
          example: "Orman girişinde plastik atıklar var."

    PollutionReport:
      type: object
      description: Kirli alan modeli
      properties:
        _id:
          type: string
          example: "rep123"
        coords:
          type: object
          properties:
            lat:
              type: number
            long:
              type: number
        status:
          type: string
          example: "Bekliyor"

    CleanReportInput:
      type: object
      description: Temizlik kanıtı verisi
      required:
        - taskId
        - imageUrl
      properties:
        taskId:
          type: string
          example: "rep123"
        imageUrl:
          type: string
          example: "[https://temiziz.com/uploads/temizlendi.jpg](https://temiziz.com/uploads/temizlendi.jpg)"

    TaskStatusInput:
      type: object
      description: Görev durumu güncelleme verisi
      required:
        - status
      properties:
        status:
          type: string
          example: "Temizlendi"

    PointsInput:
      type: object
      description: Puan güncelleme verisi
      required:
        - pointsToAdd
      properties:
        pointsToAdd:
          type: integer
          example: 50

    AbuseReportInput:
      type: object
      description: Şikayet verisi
      required:
        - targetId
        - reason
      properties:
        targetId:
          type: string
          example: "cmt456"
        reason:
          type: string
          example: "Küfürlü içerik barındırıyor."

    CommentInput:
      type: object
      description: Yorum ekleme verisi
      required:
        - taskId
        - text
      properties:
        taskId:
          type: string
          example: "rep123"
        text:
          type: string
          example: "Harika bir iş çıkarmışsınız, elinize sağlık!"

    Comment:
      type: object
      description: Yorum modeli
      properties:
        _id:
          type: string
          example: "cmt456"
        author:
          type: string
          example: "Tuğçe Ak"
        text:
          type: string
          example: "Harika bir iş çıkarmışsınız, elinize sağlık!"
        createdOn:
          type: string
          format: date-time
          example: "2026-03-09T14:30:00Z"

    Error:
      type: object
      description: Standart hata yanıtı
      properties:
        message:
          type: string
          description: Hatayı açıklayan mesaj
          example: "Geçersiz işlem veya yetkisiz erişim."
      required:
        - message
```