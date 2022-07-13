const express = require('express');
const router = express.Router();

const { contactUs } = require('../../controllers/ContactUsController');

router.post('/', contactUs);

module.exports = router;
