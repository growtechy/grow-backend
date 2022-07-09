const express = require('express');
const router = express.Router();

const auth = require('../../middleware/adminauth');

const {
	adminRegister,
	adminLogin,
	forgotPassword,
	resetPassword
} = require('../../controllers/AdminController');

router.post('/auth/register', adminRegister);
router.post('/auth/login', adminLogin);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);

module.exports = router;
