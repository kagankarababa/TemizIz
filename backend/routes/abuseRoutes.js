const express = require('express');
const { reportAbuse } = require('../controllers/abuseController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/abuse', auth, reportAbuse);

module.exports = router;
