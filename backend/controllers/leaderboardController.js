const User = require('../models/User');

// GET /leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select('fullName profilePhoto totalLikes points')
      .sort({ totalLikes: -1 })
      .limit(50);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { getLeaderboard };
