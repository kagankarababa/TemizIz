const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const { cacheMiddleware } = require('../middleware/redisMiddleware');
const router = express.Router();

router.get('/', cacheMiddleware(600), getLeaderboard);

module.exports = router;

