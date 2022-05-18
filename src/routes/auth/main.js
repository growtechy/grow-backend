const express = require('express');
const router = express.Router();

const {
	register,
	login,
	verifyEmail,
	forgotPassword,
	verifyOtp,
	resetPassword
} = require('../../controllers/AuthController');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
