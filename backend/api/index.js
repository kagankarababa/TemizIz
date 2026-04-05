require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');

// Route imports
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');
const pollutionRoutes = require('../routes/pollutionRoutes');
const cleanRoutes = require('../routes/cleanRoutes');
const taskRoutes = require('../routes/taskRoutes');
const userRoutes = require('../routes/userRoutes');
const commentRoutes = require('../routes/commentRoutes');
const leaderboardRoutes = require('../routes/leaderboardRoutes');
const abuseRoutes = require('../routes/abuseRoutes');
const likeRoutes = require('../routes/likeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı için middleware (Serverless uyumlu)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error.message);
    res.status(500).json({ 
      message: 'Veritabanı bağlantısı kurulamadı.', 
      error: error.message 
    });
  }
});

// Ana route
app.get('/', (req, res) => {
  res.json({
    message: 'Temizİz API - Doğayı Koru, İzini Temiz Bırak! 🌿',
    version: '1.0.0',
    docs: '/v1'
  });
});

app.get('/v1', (req, res) => {
  res.json({
    message: 'Temizİz API - Doğayı Koru, İzini Temiz Bırak! 🌿',
    version: '1.0.0',
    endpoints: {
      auth: '/v1/auth',
      profile: '/v1/profile',
      pollutionReports: '/v1/pollution-reports',
      cleanReports: '/v1/clean-reports',
      tasks: '/v1/tasks',
      users: '/v1/users',
      comments: '/v1/comments',
      leaderboard: '/v1/leaderboard',
      reports: '/v1/reports',
      posts: '/v1/posts'
    }
  });
});

// Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/profile', profileRoutes);
app.use('/v1/pollution-reports', pollutionRoutes);
app.use('/v1/clean-reports', cleanRoutes);
app.use('/v1/tasks', taskRoutes);
app.use('/v1/users', userRoutes);
app.use('/v1/comments', commentRoutes);
app.use('/v1/leaderboard', leaderboardRoutes);
app.use('/v1/reports', abuseRoutes);
app.use('/v1/posts', likeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'İstenen kaynak bulunamadı.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Sunucu hatası.', error: err.message });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Temizİz API ${PORT} portunda çalışıyor 🌿`);
  });
}

module.exports = app;
