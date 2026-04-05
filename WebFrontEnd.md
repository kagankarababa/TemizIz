# Web Frontend Görev Dağılımı

Frontend Deploy Adresi: [Deploy sonrası eklenecek]

Bu dokümanda, proje ekibindeki her üyenin geliştirmekten sorumlu olduğu web frontend sayfaları ve bileşenleri listelenmektedir.

---

## Grup Üyelerinin Web Frontend Görevleri

1. [Ahmet Kağan Karababa'nın Web Frontend Görevleri](Ahmet-Kagan-Karababa/Ahmet-Kagan-Karababa-Web-Frontend-Gorevleri.md)
2. [Tuğçe Ak'ın Web Frontend Görevleri](Tugce-Ak/Tugce-Ak-Web-Frontend-Gorevleri.md)

---

## Genel Frontend Prensipleri

### 1. Responsive Tasarım (Mobile-First)
Uygulama, mobil cihazlarda ve masaüstünde sorunsuz çalışacak şekilde CSS media queries ile responsive olarak geliştirilmiştir.

### 2. Renk Paleti ve Tasarım Dili
* **Ana renkler:** Beyaz (#FFFFFF) ve Yeşil tonları (#10B981, #059669, #047857)
* **Font:** Inter (Google Fonts)
* **Stil:** Modern, sade, şık — yuvarlatılmış köşeler, hafif gölgeler
* **Glassmorphism:** Navbar'da backdrop-filter blur efekti

### 3. State Management
* **Context API** (AuthContext) kullanılarak global kullanıcı state yönetimi sağlanmıştır.
* JWT token ve kullanıcı bilgileri localStorage'da saklanır.

### 4. Routing
* **React Router v6** ile client-side routing.
* Sayfalar: Home (`/`), Login (`/login`), Register (`/register`), Profile (`/profile`), CreatePost (`/create`), PostDetail (`/post/:id`), Leaderboard (`/leaderboard`).

### 5. API İletişimi
* **Axios** instance ile merkezi API yönetimi.
* JWT token otomatik olarak her isteğe eklenir (interceptor).
* 401 hatalarında otomatik çıkış yapılır.

### 6. Form Validasyonu
* Client-side validasyon ile kullanıcı giriş hataları önlenir.
* Hata mesajları Türkçe olarak gösterilir.

### 7. Kullanılan Teknolojiler
* **Vite** — Build tool
* **React** — UI kütüphanesi
* **React Router** — Routing
* **Axios** — HTTP istemcisi
* **JavaScript (ES6+)** — Programlama dili
