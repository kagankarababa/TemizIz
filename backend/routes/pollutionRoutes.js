const express = require('express');
const { getPollutionReports, createPollutionReport, updatePollutionReport, deletePollutionReport } = require('../controllers/pollutionController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.get('/', getPollutionReports);
router.post('/', auth, upload.single('image'), createPollutionReport);
router.put('/:id', auth, upload.single('image'), updatePollutionReport);
router.delete('/:id', auth, deletePollutionReport);

module.exports = router;
