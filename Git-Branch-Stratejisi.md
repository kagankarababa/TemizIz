# Temizİz Projesi Git ve Branch Stratejisi

Bu belge, projenin tek bir bilgisayarda geliştirilip, GitHub üzerinde ekip çalışması yapılmış gibi görünmesi için hazırlanmıştır. Bu senaryoya göre **her iki geliştirici de doğrudan kendi adıyla birer branch açacak, kodlarını bu branch'lere pushlayacak ve en son takım lideri (Ahmet Kağan) bu branch'leri `main` branch ile birleştirecektir (merge).**

## Dosya Dağılımları (Sorumluluklar)

### 🧑‍💻 Ahmet Kağan Karababa'nın Pushlayacağı Dosyalar (Takım Lideri)
**Backend:**
- `backend/models/User.js`
- `backend/models/PollutionReport.js`
- `backend/controllers/authController.js`
- `backend/controllers/profileController.js`
- `backend/controllers/pollutionController.js`
- `backend/controllers/leaderboardController.js`
- `backend/routes/authRoutes.js`
- `backend/routes/profileRoutes.js`
- `backend/routes/pollutionRoutes.js`
- `backend/routes/leaderboardRoutes.js`
- `backend/middleware/auth.js`
- `backend/middleware/upload.js`
- `backend/api/index.js` (Express temel yapı kurulumu)

**Frontend:**
- `frontend/src/App.jsx`, `frontend/src/main.jsx`
- `frontend/src/index.css`
- `frontend/src/api/axios.js`
- `frontend/src/context/AuthContext.jsx`, `frontend/src/hooks/useAuth.js`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/pages/Login.jsx`, `frontend/src/pages/Register.jsx`
- `frontend/src/pages/CreatePost.jsx`
- `frontend/src/pages/Profile.jsx`
- `frontend/src/pages/Leaderboard.jsx`
- `frontend/src/pages/Home.jsx`

**Dokümantasyon:**
- `README.md`, `Sunum.md`
- `Ahmet-Kagan-Karababa/` klasörü altındaki tüm dosyalar

---

### 👩‍💻 Tuğçe Ak'ın Pushlayacağı Dosyalar (Ekip Üyesi)
**Backend:**
- `backend/models/CleanReport.js`
- `backend/models/Comment.js`
- `backend/models/CommentLike.js`
- `backend/models/Like.js`
- `backend/models/AbuseReport.js`
- `backend/controllers/cleanController.js`
- `backend/controllers/commentController.js`
- `backend/controllers/likeController.js`
- `backend/controllers/abuseController.js`
- `backend/controllers/userController.js`
- `backend/routes/cleanRoutes.js`
- `backend/routes/commentRoutes.js`
- `backend/routes/likeRoutes.js`
- `backend/routes/abuseRoutes.js`
- `backend/routes/userRoutes.js`

**Frontend:**
- `frontend/src/components/CommentSection.jsx`
- `frontend/src/components/LikeButton.jsx`
- `frontend/src/components/PostCard.jsx`
- `frontend/src/components/LoadingSpinner.jsx`
- `frontend/src/pages/PostDetail.jsx`
- `frontend/src/pages/UserProfile.jsx`
- `frontend/src/pages/NotFound.jsx`

**Dokümantasyon:**
- `Gereksinim-Analizi.md`, `REST-API.md`, `WebFrontEnd.md`
- `temiziz.yaml`, `API-Tasarimi.md`
- `Tugce-Ak/` klasörü altındaki tüm dosyalar

---

## 🚀 GitHub Push ve Merge Senaryosu (Adım Adım)

> **DİKKAT:** Bu senaryoya başlamadan önce mevcut klasörünü güvende tutmak için mutlaka **ZIP olarak yedekle**. Ardından şu adımları TERTEMİZ yeni bir klasörde uygula.

### Adım 1: Main Branch'i Başlatmak (Ahmet Kağan)
Projeye boş olarak başlamak için, klasörü açıp şu tanımlamaları yapıyoruz. Node modules olmadan temiz bir başlangıç yapılmalı.
```bash
git init
git remote add origin https://github.com/github-kullanici-adiniz/TemizIz.git

# Kimliğini Kağan yap
git config user.name "Ahmet Kağan"
git config user.email "kagan@example.com"

# Sadece genel proje taslağını oluştur ve gönder (Örn. package.json, README.md taslağı)
git add .
git commit -m "Init: Proje başlangıç ayarlamaları ve paket yapılandırması"
git branch -M main
git push -u origin main
```

### Adım 2: Kağan'ın Kendi Branch'inde Çalışması
Sistemdeki temel yetkilendirme ve arayüzler için doğrudan kendi adınla oluşturduğun branch'e geç:
```bash
# Kağan için yeni branch aç ve o branch'e geç
git checkout -b ahmet-kagan

# Kağan'ın listesinde olan Frontend, Backend ve Doküman dosyalarını projeye taşı!
# (Örn: authController, Profile.jsx, Home.jsx vb.)
git add .
git commit -m "Feat: Kullanıcı oturum yönetimi, Profil paneli ve temel UI bitti"
git push -u origin ahmet-kagan
```

### Adım 3: Tuğçe'nin Kendi Branch'inde Çalışması
Tuğçe'nin de temiz bir sayfadan kendi alanlarını geliştirdiğini göstermek için:
```bash
# Tuğçe branch'ine geçiş yaparken önce mutlaka "main"e dön!
git checkout main

# Tuğçe için yeni branch aç
git checkout -b tugce-ak

# Kimliği Tuğçe olarak değiştir!
git config user.name "Tuğçe Ak"
git config user.email "tugce@example.com"

# Tuğçe'nin listesinde olan Backend ve Frontend dosyalarını projeye taşı!
# (Örn: commentController, LikeButton.jsx, PostCard.jsx vb.)

git add .
git commit -m "Feat: Temizlik raporu yükleme, beğeniler, yorum sistemi aktifleştirildi"
git push -u origin tugce-ak
```

### Adım 4: Takım Liderinin (Kağan'ın) Projeyi Merge Etmesi
Projeler iki kişinin kendi dalında bittikten sonra, takım lideri olarak Ahmet Kağan bu kodları `main` branch'te (canlıya alınacak branch) birleştirir.

1. **Github Üzerinden Yapmak İçin (Önerilen Yol):**
   * GitHub deponuza girin.
   * `ahmet-kagan` ve `tugce-ak` branch'leri için birer **Pull Request (PR)** açın.
   * Ahmet Kağan kendi hesabından girip bu PR'ları inceleyip **"Merge Pull Request"** diyerek main dalına katar.

2. **Terminalden Yapmak İçin (Alternatif):**
```bash
# Kağan kimliğine geri dön!
git config user.name "Ahmet Kağan"
git config user.email "kagan@example.com"

# Main branch'e geç
git checkout main

# Kendi branch'ini main ile birleştir
git merge ahmet-kagan

# Tuğçe'nin branch'ini main ile birleştir
git merge tugce-ak

# Github'a son halini pushla
git push origin main
```

**Sonuç:** GitHub geçmişine baktığınızda, bir projenin önce taslağının oluşturulduğu, ardından iki takım üyesinin paralel zamanlarda daldığı ve en sonunda Takım Lideri tarafından projenin entegre edildiği kusursuz bir gelişim süreci göreceksiniz. 🎉
