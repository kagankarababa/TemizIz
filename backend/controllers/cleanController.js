const CleanReport = require('../models/CleanReport');
const PollutionReport = require('../models/PollutionReport');

// POST /clean-reports (file upload)
const createCleanReport = async (req, res) => {
  try {
    const { pollutionReportId } = req.body;

    if (!pollutionReportId || !req.file) {
      return res.status(400).json({ message: 'Kirli alan ID ve fotoğraf zorunludur.' });
    }

    const pollutionReport = await PollutionReport.findById(pollutionReportId);
    if (!pollutionReport) {
      return res.status(404).json({ message: 'İlgili kirli alan bildirimi bulunamadı.' });
    }

    const existingClean = await CleanReport.findOne({ pollutionReportId });
    if (existingClean) {
      return res.status(400).json({ message: 'Bu alan için zaten temizlik raporu mevcut.' });
    }

    const imageUrl = req.file.path;

    const cleanReport = await CleanReport.create({
      pollutionReportId,
      userId: req.user._id,
      imageUrl
    });

    pollutionReport.status = 'Temizlendi';
    await pollutionReport.save();

    res.status(201).json(cleanReport);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// DELETE /clean-reports/:id
const deleteCleanReport = async (req, res) => {
  try {
    const cleanReport = await CleanReport.findById(req.params.id);

    if (!cleanReport) {
      return res.status(404).json({ message: 'Temizlik raporu bulunamadı.' });
    }

    if (cleanReport.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu raporu silme yetkiniz yok.' });
    }

    const pollutionReport = await PollutionReport.findById(cleanReport.pollutionReportId);
    if (pollutionReport) {
      pollutionReport.status = 'Bekliyor';
      await pollutionReport.save();
    }

    await CleanReport.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { createCleanReport, deleteCleanReport };
