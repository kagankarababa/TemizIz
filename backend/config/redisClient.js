const Redis = require('ioredis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const client = new Redis(REDIS_URL);

client.on('connect', () => {
  console.log('[Redis] Bağlantı başarılı.');
});

client.on('error', (err) => {
  console.error('[Redis] Bağlantı hatası:', err.message);
});

async function cacheGet(key) {
  try {
    const data = await client.get(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error('[Redis] cacheGet hatası:', err.message);
    return null;
  }
}

async function cacheSet(key, value, ttlSeconds) {
  try {
    const serialized = JSON.stringify(value);
    await client.set(key, serialized, 'EX', ttlSeconds);
  } catch (err) {
    console.error('[Redis] cacheSet hatası:', err.message);
    return null;
  }
}

async function cacheDel(key) {
  try {
    await client.del(key);
  } catch (err) {
    console.error('[Redis] cacheDel hatası:', err.message);
    return null;
  }
}

function getRedisClient() {
  return client;
}

module.exports = { cacheGet, cacheSet, cacheDel, getRedisClient };
