const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { cacheGet } = require('../config/redisClient');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Yetkilendirme başarısız. Token bulunamadı.' });
    }

    const token = authHeader.split(' ')[1];

    // Redis blacklist kontrolü
    try {
      const blacklisted = await cacheGet(`bl_${token}`);
      if (blacklisted) {
        return res.status(401).json({ message: 'Token geçersiz kılınmış. Lütfen tekrar giriş yapın.' });
      }
    } catch (redisErr) {
      // Redis bağlantı hatası durumunda devam et
      console.error('Redis blacklist kontrol hatası:', redisErr.message);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
  }
};

module.exports = auth;

