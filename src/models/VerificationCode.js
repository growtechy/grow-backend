const mongoose = require('mongoose');
const sendMail = require('../mailer/mails');
const sendSMS = require('../mailer/sms');
const Users = require('../models/User');

const verifySchema = mongoose.Schema({
	code: {
		type: Number,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	isPasswordReset: {
		type: Boolean,
		default: false
	},
	isPhoneNumber: {
		type: Boolean,
		default: false
	},
	isEmail: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

verifySchema.statics.generateVerificationCode = async () => {
	const generatedCode = Math.floor(100000 + Math.random() * 900000);

	return generatedCode;
};

// Verification token to validate password reset
verifySchema.statics.assignResetPasswordVerifyCode = async (userId, code, email) => {
	const verify = await Verify.findOne({ userId: userId });

	if (verify) {
		// Update Token and Resend...
		await Verify.findOneAndUpdate({ userId: userId }, { code: code, isPasswordReset: true });
	} else {
		await Verify({
			userId: userId,
			code: code,
			isPasswordReset: true
		}).save();
	}

	const mailInfo = {
		from: 'GrowNG <info@growng.company>',
		to: email,
		subject: `Forgot Password`,
		template: 'regular',
		'h:X-Mailgun-Variables': JSON.stringify({
			message: `Hi use this code to verify it's you: ${code}`
		}),
		'h:Reply-To': 'no-reply@growng.company'
	};

	await sendMail(mailInfo);
};

// Send Token to USer SMS and Mail to verify account

verifySchema.statics.assignVerificationCode = async (userId, code, email, phoneNumber) => {
	const verify = await Verify.findOne({ userId: userId });

	if (verify) {
		// Update Token and Resend...
		await Verify.findOneAndUpdate({ userId: userId }, { code: code });
	} else {
		await Verify({
			userId: userId,
			code: code
		}).save();
	}

	var message = `Hi, use this code to verify your telephone: ${code}`;

	await sendSMS(phoneNumber, message);

	const mailInfo = {
		from: 'GrowNG <info@growng.company>',
		to: email,
		subject: `Forgot Password`,
		template: 'regular',
		'h:X-Mailgun-Variables': JSON.stringify({
			message: `Hi use this code to verify it's you: ${code}`
		}),
		'h:Reply-To': 'no-reply@growng.company'
	};

	await sendMail(mailInfo);
};

verifySchema.statics.verifyPhoneNumberOTP = async (userId, code) => {
	const verify = await Verify.findOne({ userId: userId });

	await Users.findOneAndUpdate(
		{ _id: userId },
		{
			isVerified: {
				phoneNumber: true
			}
		}
	);

	return true;
};

// Verification token to validate password reset
verifySchema.statics.verifyPhoneNumber = async (userId, code, phoneNumber) => {
	const verify = await Verify.findOne({ userId: userId });

	if (verify) {
		// Update Token and Resend...
		await Verify.findOneAndUpdate({ userId: userId }, { code: code, isPhoneNumber: true });
	} else {
		await Verify({
			userId: userId,
			code: code,
			isPhoneNumber: true
		}).save();
	}

	var message = `Hi, use this code to verify your telephone: ${code}`;

	await sendSMS(phoneNumber, message);

	return code;
};

const Verify = mongoose.model('VerificationCode', verifySchema);

module.exports = Verify;
