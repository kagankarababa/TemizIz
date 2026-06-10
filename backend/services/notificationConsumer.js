const { getChannel, NOTIFICATION_QUEUE } = require('../config/rabbitmqClient');
const Notification = require('../models/Notification');

async function startConsumer() {
  const channel = getChannel();

  if (!channel) {
    console.warn('[Tüketici] RabbitMQ kanalı bulunamadı. Tüketici başlatılamıyor.');
    return;
  }

  channel.prefetch(1);
  console.log('[Tüketici] Kuyruk dinleniyor:', NOTIFICATION_QUEUE);

  channel.consume(NOTIFICATION_QUEUE, async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());
      await Notification.create({
        type: data.type,
        message: data.message,
        userId: data.userId,
        relatedId: data.relatedId
      });
      console.log('[Tüketici] Bildirim veritabanına kaydedildi:', data.type);
      channel.ack(msg);
    } catch (err) {
      console.error('[Tüketici] Mesaj işleme hatası:', err.message);
      channel.nack(msg, false, true);
    }
  });
}

module.exports = { startConsumer };
