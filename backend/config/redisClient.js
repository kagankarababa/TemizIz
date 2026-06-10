const Redis = require('ioredis');

const REDIS_URL = process.env.REDIS_URL;

let client = null;

// Redis'e sadece REDIS_URL tanımlıysa bağlan (Docker ortamı)
// Vercel gibi serverless ortamlarda Redis olmadan çalış
if (REDIS_URL) {
  client = new Redis(REDIS_URL, {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 3) return null; // 3 denemeden sonra dur
      return Math.min(times * 200, 2000);
    },
    lazyConnect: true,
  });

  client.on('connect', () => {
    console.log('[Redis] Bağlantı başarılı.');
  });

  client.on('error', (err) => {
    console.error('[Redis] Bağlantı hatası:', err.message);
  });

  // Bağlantıyı başlat
  client.connect().catch((err) => {
    console.error('[Redis] İlk bağlantı başarısız:', err.message);
    client = null;
  });
} else {
  console.log('[Redis] REDIS_URL tanımlı değil, Redis devre dışı (Vercel modu).');
}

function isReady() {
  return client && client.status === 'ready';
}

async function cacheGet(key) {
  if (!isReady()) return null;
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
  if (!isReady()) return null;
  try {
    const serialized = JSON.stringify(value);
    await client.set(key, serialized, 'EX', ttlSeconds);
  } catch (err) {
    console.error('[Redis] cacheSet hatası:', err.message);
    return null;
  }
}

async function cacheDel(key) {
  if (!isReady()) return null;
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
