const User = require('../models/User');
const PollutionReport = require('../models/PollutionReport');
const CleanReport = require('../models/CleanReport');

// PUT /users/:id/points
const updateUserPoints = async (req, res) => {
  try {
    const { pointsToAdd } = req.body;

    if (pointsToAdd === undefined || typeof pointsToAdd !== 'number') {
      return res.status(400).json({ message: 'Eklenecek puan miktarı zorunludur.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    user.points += pointsToAdd;
    await user.save();

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      points: user.points
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// GET /users/:id — Public profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// GET /users/:id/posts — User's posts
const getUserPosts = async (req, res) => {
  try {
    const reports = await PollutionReport.find({ userId: req.params.id })
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

module.exports = { updateUserPoints, getUserProfile, getUserPosts };
