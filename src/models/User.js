const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		min: 3,
		max: 255,
		trim: true
	},
	email: {
		type: String,
		min: 3,
		lowercase: true,
		unique: true,
		trim: true
	},
	phoneNumber: {
		type: String,
		trim: true,
		required: true
	},
	cityState: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: 'https://res.cloudinary.com/growng/image/upload/v1652778178/assets/green_icon_wzwmv1.png'
	},
	password: {
		type: String,
		min: 8,
		required: true
	},
	isVerified: [
		{
			email: {
				type: Boolean,
				default: false
			},
			phoneNumber: {
				type: Boolean,
				default: false
			}
		}
	],

	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	],
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

// Model Bindings...
UserSchema.statics.findByCredentials = async (phoneNumber, password) => {
	const user = await User.findOne({ phoneNumber });

	if (!user) throw new Error('Invalid login credentials');

	if (user.isVerified[0].phoneNumber === false) throw new Error('Please verify your phone number');

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) throw new Error('Invalid login credentials');

	return user;
};

UserSchema.statics.findSocialByCredentials = async (email) => {
	const user = await User.findOne({ email });

	if (!user) throw new Error('Unable to login');

	return user;
};

UserSchema.methods.toJSON = function() {
	const user = this;

	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

UserSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.APP_KEY);

	user.tokens = user.tokens.concat({ token });

	await user.save();

	return token;
};

// Hashing a plain text password before saving...
UserSchema.pre('save', async function(next) {
	const user = this;

	if (user.isModified('password')) {
		const salt = await bcrypt.genSalt(8);

		const hashedPassword = await bcrypt.hash(user.password, salt);
		user.password = hashedPassword;
	}

	next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
