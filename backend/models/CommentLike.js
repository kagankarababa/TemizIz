const mongoose = require('mongoose');

const commentLikeSchema = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

commentLikeSchema.index({ commentId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('CommentLike', commentLikeSchema);
