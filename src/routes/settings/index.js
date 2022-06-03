const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { updateNotification } = require('../../controllers/SettingsController');

router.put('/notification', auth, updateNotification);

module.exports = router;
