const express = require('express');
const { updateUserPoints, getUserProfile, getUserPosts } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:id', getUserProfile);
router.get('/:id/posts', getUserPosts);
router.put('/:id/points', auth, updateUserPoints);

module.exports = router;
