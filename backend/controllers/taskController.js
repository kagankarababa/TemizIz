const PollutionReport = require('../models/PollutionReport');

// PUT /tasks/:id/status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['Bekliyor', 'Temizlendi'].includes(status)) {
      return res.status(400).json({ message: 'Geçerli bir durum belirtiniz: Bekliyor veya Temizlendi' });
    }

    const report = await PollutionReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Görev bulunamadı.' });
    }

    report.status = status;
    await report.save();

    res.status(200).json({ message: 'Görev durumu güncellendi.', status: report.status });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { updateTaskStatus };
