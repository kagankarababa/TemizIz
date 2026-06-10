const { cacheGet, cacheSet } = require('../config/redisClient');

const cacheMiddleware = (ttlSeconds = 300) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await cacheGet(key);
      if (cached) {
        console.log(`Cache HIT: ${key}`);
        return res.json(cached);
      }
    } catch (err) {
      console.error('Redis cache okuma hatası:', err.message);
    }

    // Override res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      try {
        await cacheSet(key, data, ttlSeconds);
        console.log(`Cache SET: ${key} (TTL: ${ttlSeconds}s)`);
      } catch (err) {
        console.error('Redis cache yazma hatası:', err.message);
      }
      return originalJson(data);
    };

    next();
  };
};

module.exports = { cacheMiddleware };
