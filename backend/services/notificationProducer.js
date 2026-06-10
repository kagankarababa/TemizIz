const { getChannel, NOTIFICATION_QUEUE } = require('../config/rabbitmqClient');
const Notification = require('../models/Notification');

async function sendNotification({ type, message, userId, relatedId }) {
  const channel = getChannel();

  if (channel) {
    try {
      const payload = JSON.stringify({ type, message, userId, relatedId });
      channel.sendToQueue(NOTIFICATION_QUEUE, Buffer.from(payload), { persistent: true });
      console.log('[Bildirim] RabbitMQ kuyruğuna gönderildi:', type);
    } catch (err) {
      console.error('[Bildirim] RabbitMQ gönderim hatası:', err.message);
    }
  } else {
    try {
      console.log('[Bildirim] RabbitMQ kullanılamıyor. Doğrudan veritabanına kaydediliyor...');
      await Notification.create({ type, message, userId, relatedId });
      console.log('[Bildirim] Veritabanına başarıyla kaydedildi:', type);
    } catch (err) {
      console.error('[Bildirim] Veritabanına kaydetme hatası:', err.message);
    }
  }
}

module.exports = { sendNotification };
