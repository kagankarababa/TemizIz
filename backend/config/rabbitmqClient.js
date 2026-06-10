const amqp = require('amqplib');

const NOTIFICATION_QUEUE = 'temiziz_notifications';
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000;

let channel = null;
let connection = null;

async function connectRabbitMQ() {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[RabbitMQ] Bağlantı deneniyor... (Deneme ${attempt}/${MAX_RETRIES})`);
      connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();

      await channel.assertQueue(NOTIFICATION_QUEUE, { durable: true });
      console.log('[RabbitMQ] Bağlantı başarılı. Kuyruk hazır:', NOTIFICATION_QUEUE);

      connection.on('close', () => {
        console.log('[RabbitMQ] Bağlantı kapandı. Yeniden bağlanılıyor...');
        channel = null;
        connection = null;
        setTimeout(connectRabbitMQ, RETRY_INTERVAL);
      });

      connection.on('error', (err) => {
        console.error('[RabbitMQ] Bağlantı hatası:', err.message);
      });

      return channel;
    } catch (err) {
      console.error(`[RabbitMQ] Bağlantı başarısız (Deneme ${attempt}/${MAX_RETRIES}):`, err.message);
      if (attempt < MAX_RETRIES) {
        console.log(`[RabbitMQ] ${RETRY_INTERVAL / 1000} saniye sonra tekrar denenecek...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
      } else {
        console.error('[RabbitMQ] Maksimum deneme sayısına ulaşıldı. Bağlantı kurulamadı.');
      }
    }
  }
  return null;
}

function getChannel() {
  return channel;
}

module.exports = { connectRabbitMQ, getChannel, NOTIFICATION_QUEUE };
