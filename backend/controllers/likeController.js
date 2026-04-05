const Like = require('../models/Like');
const PollutionReport = require('../models/PollutionReport');
const User = require('../models/User');

// POST /posts/:id/like
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await PollutionReport.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Gönderi bulunamadı.' });
    }

    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return res.status(400).json({ message: 'Bu gönderiyi zaten beğendiniz.' });
    }

    await Like.create({ postId, userId });

    post.likeCount += 1;
    await post.save();

    await User.findByIdAndUpdate(post.userId, { $inc: { totalLikes: 1 } });

    res.status(201).json({ message: 'Gönderi beğenildi.', likeCount: post.likeCount });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// DELETE /posts/:id/like
const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const existingLike = await Like.findOne({ postId, userId });
    if (!existingLike) {
      return res.status(400).json({ message: 'Bu gönderiyi henüz beğenmemişsiniz.' });
    }

    await Like.findByIdAndDelete(existingLike._id);

    const post = await PollutionReport.findById(postId);
    if (post) {
      post.likeCount = Math.max(0, post.likeCount - 1);
      await post.save();
      await User.findByIdAndUpdate(post.userId, { $inc: { totalLikes: -1 } });
    }

    res.status(200).json({ message: 'Beğeni geri çekildi.', likeCount: post ? post.likeCount : 0 });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { likePost, unlikePost };
