const bcrypt = require('bcryptjs');
const User = require('../models/User');
const PollutionReport = require('../models/PollutionReport');
const CleanReport = require('../models/CleanReport');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

// GET /profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// PUT /profile
const updateProfile = async (req, res) => {
  try {
    const { fullName, email, password, profilePhoto } = req.body;
    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// DELETE /profile
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    await Like.deleteMany({ userId });
    await Comment.deleteMany({ userId });
    await CleanReport.deleteMany({ userId });
    await PollutionReport.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { getProfile, updateProfile, deleteProfile };
