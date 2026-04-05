const PollutionReport = require('../models/PollutionReport');
const CleanReport = require('../models/CleanReport');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

// GET /pollution-reports
const getPollutionReports = async (req, res) => {
  try {
    const reports = await PollutionReport.find()
      .populate('userId', 'fullName profilePhoto')
      .sort({ createdAt: -1 });

    const reportsWithClean = await Promise.all(
      reports.map(async (report) => {
        const cleanReport = await CleanReport.findOne({ pollutionReportId: report._id });
        return {
          ...report.toObject(),
          cleanReport: cleanReport || null
        };
      })
    );

    res.status(200).json(reportsWithClean);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// POST /pollution-reports (file upload)
const createPollutionReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Fotoğraf yüklemek zorunludur.' });
    }

    const { description, locationName } = req.body;
    const imageUrl = req.file.path;

    const report = await PollutionReport.create({
      userId: req.user._id,
      imageUrl,
      description: description || '',
      locationName: locationName || ''
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// PUT /pollution-reports/:id (Kağan — Gönderi düzenleme)
const updatePollutionReport = async (req, res) => {
  try {
    const report = await PollutionReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Bildirim bulunamadı.' });
    }

    if (report.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu bildirimi güncelleme yetkiniz yok.' });
    }

    const { description, locationName } = req.body;

    if (req.file) {
      report.imageUrl = req.file.path;
    }
    if (description !== undefined) report.description = description;
    if (locationName !== undefined) report.locationName = locationName;

    await report.save();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// DELETE /pollution-reports/:id (Tuğçe — Gönderi silme)
const deletePollutionReport = async (req, res) => {
  try {
    const report = await PollutionReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Gönderi bulunamadı.' });
    }

    if (report.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu gönderiyi silme yetkiniz yok.' });
    }

    // İlişkili temizlik raporu, yorumlar ve beğenileri de sil
    await CleanReport.deleteMany({ pollutionReportId: report._id });
    await Comment.deleteMany({ postId: report._id });
    await Like.deleteMany({ postId: report._id });
    await PollutionReport.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { getPollutionReports, createPollutionReport, updatePollutionReport, deletePollutionReport };
