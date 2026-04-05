const AbuseReport = require('../models/AbuseReport');

// POST /reports/abuse
const reportAbuse = async (req, res) => {
  try {
    const { targetId, reason } = req.body;

    if (!targetId || !reason) {
      return res.status(400).json({ message: 'Hedef ID ve sebep zorunludur.' });
    }

    const report = await AbuseReport.create({
      reporterId: req.user._id,
      targetId,
      reason
    });

    res.status(201).json({ message: 'Şikayetiniz alındı ve incelemeye gönderildi.', report });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { reportAbuse };
