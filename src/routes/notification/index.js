const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { fetchNotifications } = require('../../controllers/NotificationController');

router.get('/', auth, fetchNotifications);

module.exports = router;
