require('dotenv').config();
const express = require('express');
const connectDB = require('../config/db');
const { connectRabbitMQ } = require('../config/rabbitmqClient');
const { startConsumer } = require('../services/notificationConsumer');
const { getRedisClient } = require('../config/redisClient');

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

// ============================================
// CORS - Manuel header ekleme (Vercel uyumlu)
// Her response'a CORS header'ları ekle
// ============================================
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // OPTIONS preflight isteği ise hemen cevapla, DB'ye gitme
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

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

// Health check endpoint
app.get('/v1/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      mongodb: 'disconnected',
      redis: 'disconnected',
      rabbitmq: 'disconnected'
    }
  };

  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      health.services.mongodb = 'connected';
    }
  } catch (err) {
    health.services.mongodb = 'error';
  }

  try {
    const redisClient = getRedisClient();
    if (redisClient && redisClient.status === 'ready') {
      health.services.redis = 'connected';
    }
  } catch (err) {
    health.services.redis = 'error';
  }

  try {
    const { getChannel } = require('../config/rabbitmqClient');
    if (getChannel()) {
      health.services.rabbitmq = 'connected';
    }
  } catch (err) {
    health.services.rabbitmq = 'error';
  }

  const allConnected = Object.values(health.services).every(s => s === 'connected');
  res.status(allConnected ? 200 : 503).json(health);
});

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

app.listen(PORT, () => {
  console.log(`Temizİz API ${PORT} portunda çalışıyor 🌿`);
});

// RabbitMQ ve Consumer başlatma
connectRabbitMQ()
  .then(() => startConsumer())
  .catch(err => console.error('RabbitMQ başlatma hatası:', err.message));

module.exports = app;

