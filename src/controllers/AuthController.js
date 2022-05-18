const Users = require('../models/User');
const { registerValidations, loginValidations } = require('../helper/validator');
const sendMail = require('../mailer/mails');
const bcrypt = require('bcryptjs');
const Verification = require('../models/VerificationCode');

const register = async (req, res) => {
	try {
		// Confirm request and validate data
		const { error } = registerValidations(req.body);
		if (error)
			return res.status(200).json({
				data: [],
				message: error.details[0].message,
				status: 'failed'
			});

		const newUser = await Users(req.body).save();

		newUser.isVerified = [
			{
				email: false,
				phoneNumber: false
			}
		];

		await Users.updateOne({ _id: newUser._id }, { isVerified: newUser.isVerified });

		const mailInfo = {
			from: 'GrowNG <info@growng.company>',
			to: newUser.email,
			subject: `Welcome on Board`,
			template: 'email_verification',
			'h:X-Mailgun-Variables': JSON.stringify({
				name: `${req.body.fullName}`,
				confirm_url:
					process.env.NODE_ENV == 'local'
						? `${process.env.APP_URL}:${process.env.PORT}/api/v1/auth/verify?type=email&id=${newUser._id}`
						: `${process.env.APP_URL}/api/v1/auth/verify?type=email&id=${newUser._id}`
			}),
			'h:Reply-To': 'no-reply@growng.company'
		};

		await sendMail(mailInfo);

		// Generate OTP
		const code = await Verification.generateVerificationCode();

		Verification.assignVerificationCode(newUser._id.toString(), code, newUser.email, newUser.phoneNumber);

		res.status(200).json({
			data: newUser,
			code: code,
			message: 'Registration successful',
			status: 'success'
		});
	} catch (error) {
		res.status(400).json({
			data: [],
			message: error.message,
			status: 'failed'
		});
	}
};

const verifyEmail = async (req, res) => {
	try {
		const user = await Users.findOne({ _id: req.query.id });

		if (!user)
			return res.status(200).json({
				data: [],
				message: 'Verification failed',
				status: 'failed'
			});

		await Users.updateOne(
			{ _id: req.query.id },
			{
				isVerified: {
					email: true
				}
			}
		);

		res.status(200).json({
			data: true,
			message: 'Success',
			status: 'success'
		});
	} catch (error) {
		res.status(400).json({
			data: [],
			message: error.message,
			status: 'failed'
		});
	}
};
const login = async (req, res) => {
	try {
		const user = await Users.findByCredentials(req.body.phoneNumber, req.body.password);

		const token = await user.generateAuthToken();

		res.status(200).json({
			data: user,
			token: token,
			message: 'Success'
		});
	} catch (error) {
		res.status(400).json({
			data: [],
			message: error.message,
			status: 'failed'
		});
	}
};

const forgotPassword = async (req, res) => {
	try {
		// Get User with the phone number
		const user = await Users.findOne({ phoneNumber: req.body.phoneNumber });

		if (!user)
			return res.status(200).json({
				data: [],
				message: 'Incorrect phone number',
				status: 'failed'
			});

		// Generate OTP
		const code = await Verification.generateVerificationCode();

		Verification.verifyPhoneNumber(user._id.toString(), code, user.phoneNumber);

		statusCode = 200;
		data = user;
		message = `We have just sent a code to:(${user.phoneNumber})`;

		res.status(200).json({
			data: user,
			code: code,
			message: `We have just sent a code to:(${user.phoneNumber})`,
			status: 'success'
		});
	} catch (error) {
		res.status(400).json({
			data: [],
			message: error.message,
			status: 'failed'
		});
	}
};

const verifyOtp = async (req, res) => {
	try {
		const checkCode = await Verification.findOne({ code: req.body.code, userId: req.body._id });

		if (!checkCode)
			return res.status(200).json({
				data: [],
				message: 'The code you entered was inccorect, please try again',
				status: 'failed'
			});

		// Verify OTP
		const phoneVerify = await Verification.verifyPhoneNumberOTP(req.body._id, req.body.code);

		res.status(200).json({
			data: phoneVerify,
			message: `Great!, You have successfully authenticated your account.`,
			status: 'success'
		});
	} catch (error) {
		res.status(400).json({
			data: [],
			message: error.message,
			status: 'failed'
		});
	}
};

const resetPassword = async (req, res) => {
	try {
		const user = await Users.findById({ _id: req.body.userId });

		if (!user)
			return res.status(200).json({
				data: [],
				message: 'Something went wrong',
				status: 'failed'
			});

		if (req.body.newPassword != req.body.confirmPassword)
			return res.status(200).json({
				data: [],
				message: 'Password does not match',
				status: 'failed'
			});

		const salt = await bcrypt.genSalt(8);

		const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

		await Users.updateOne({ _id: req.body.userId }, { password: hashedPassword });

		res.status(200).json({
			data: user,
			message: `Yipee!, You password reset is successful.`,
			status: 'success'
		});
	} catch (error) {
		res.status(400).json({
			data: [],
			message: error.message,
			status: 'failed'
		});
	}
};

module.exports = { register, login, verifyEmail, forgotPassword, verifyOtp, resetPassword };
