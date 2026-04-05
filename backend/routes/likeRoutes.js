const express = require('express');
const { likePost, unlikePost } = require('../controllers/likeController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/:id/like', auth, likePost);
router.delete('/:id/like', auth, unlikePost);

module.exports = router;
