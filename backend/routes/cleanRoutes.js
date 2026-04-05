const express = require('express');
const { createCleanReport, deleteCleanReport } = require('../controllers/cleanController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/', auth, upload.single('image'), createCleanReport);
router.delete('/:id', auth, deleteCleanReport);

module.exports = router;
