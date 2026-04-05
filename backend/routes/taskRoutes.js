const express = require('express');
const { updateTaskStatus } = require('../controllers/taskController');
const auth = require('../middleware/auth');
const router = express.Router();

router.put('/:id/status', auth, updateTaskStatus);

module.exports = router;
