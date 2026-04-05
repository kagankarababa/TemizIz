const express = require('express');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);
router.delete('/', auth, deleteProfile);

module.exports = router;
