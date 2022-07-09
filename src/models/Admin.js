const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminSchema = mongoose.Schema({
	fullname: {
		type: String,
		required: true,
		min: 3,
		max: 255,
		trim: true
	},
	username: {
		type: String,
		required: true,
		min: 3,
		unique: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		min: 3,
		lowercase: true,
		unique: true,
		trim: true
	},
	avatar: {
		type: String,
		default:
			'https://res.cloudinary.com/growng/image/upload/v1652778178/assets/green_icon_wzwmv1.png'
	},
	password: {
		type: String,
		required: true,
		min: 4
	},
	accountType: {
		type: String,
		default: 'super'
	},

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
AdminSchema.statics.findByCredentials = async (username, password) => {
	const user = await User.findOne({ username });

	if (!user) throw new Error('Unable to login');

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) throw new Error('Unable to login');

	return user;
};

AdminSchema.methods.toJSON = function () {
	const user = this;

	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

AdminSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.APP_KEY);

	user.tokens = user.tokens.concat({ token });

	await user.save();

	return token;
};

// Hashing a plain text password before saving...
AdminSchema.pre('save', async function (next) {
	const user = this;

	console.log(user);

	if (user.isModified('password')) {
		const salt = await bcrypt.genSalt(8);

		const hashedPassword = await bcrypt.hash(user.password, salt);
		user.password = hashedPassword;
	}

	next();
});

const User = mongoose.model('Admin', AdminSchema);

module.exports = User;
