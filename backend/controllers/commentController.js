const Comment = require('../models/Comment');
const CommentLike = require('../models/CommentLike');

// POST /comments
const addComment = async (req, res) => {
  try {
    const { postId, text, parentId } = req.body;

    if (!postId || !text) {
      return res.status(400).json({ message: 'Gönderi ID ve yorum metni zorunludur.' });
    }

    const commentData = {
      postId,
      userId: req.user._id,
      text
    };

    // Yoruma yanıt ise parentId ekle
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Yanıtlanacak yorum bulunamadı.' });
      }
      commentData.parentId = parentId;
    }

    const comment = await Comment.create(commentData);

    const populated = await Comment.findById(comment._id)
      .populate('userId', 'fullName profilePhoto');

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// GET /comments/:taskId
const getCommentsByTask = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.taskId })
      .populate('userId', 'fullName profilePhoto')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// DELETE /comments/:id
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Yorum bulunamadı.' });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu yorumu silme yetkiniz yok.' });
    }

    // Yanıtları ve beğenileri de sil
    await Comment.deleteMany({ parentId: req.params.id });
    await CommentLike.deleteMany({ commentId: req.params.id });
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// POST /comments/:id/like (Tuğçe — Yorumu beğenme)
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Yorum bulunamadı.' });
    }

    const existing = await CommentLike.findOne({
      commentId: req.params.id,
      userId: req.user._id
    });

    if (existing) {
      return res.status(400).json({ message: 'Bu yorumu zaten beğendiniz.' });
    }

    await CommentLike.create({
      commentId: req.params.id,
      userId: req.user._id
    });

    comment.likeCount += 1;
    await comment.save();

    res.status(201).json({ message: 'Yorum beğenildi.', likeCount: comment.likeCount });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// DELETE /comments/:id/like (Tuğçe — Yorum beğenisini geri çekme)
const unlikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Yorum bulunamadı.' });
    }

    const existing = await CommentLike.findOne({
      commentId: req.params.id,
      userId: req.user._id
    });

    if (!existing) {
      return res.status(400).json({ message: 'Bu yorumu beğenmemişsiniz.' });
    }

    await CommentLike.findByIdAndDelete(existing._id);
    comment.likeCount = Math.max(0, comment.likeCount - 1);
    await comment.save();

    res.status(200).json({ message: 'Beğeni geri çekildi.', likeCount: comment.likeCount });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { addComment, getCommentsByTask, deleteComment, likeComment, unlikeComment };
