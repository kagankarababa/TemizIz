const express = require('express');
const { addComment, getCommentsByTask, deleteComment, likeComment, unlikeComment } = require('../controllers/commentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, addComment);
router.get('/:taskId', getCommentsByTask);
router.delete('/:id', auth, deleteComment);
router.post('/:id/like', auth, likeComment);
router.delete('/:id/like', auth, unlikeComment);

module.exports = router;
