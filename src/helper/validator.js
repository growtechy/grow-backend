const Joi = require('joi');

const registerValidations = (data) => {
	const schema = Joi.object({
		fullName: Joi.string().min(3).max(255).required(),
		email: Joi.string(),
		cityState: Joi.string(),
		phoneNumber: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
		password: Joi.string().min(8).required()
	});

	return schema.validate(data);
};

const loginValidations = (data) => {
	const schema = Joi.object({
		phoneNumber: Joi.string().required().email(),
		password: Joi.string().required()
	});

	return schema.validate(data);
};

module.exports = { registerValidations, loginValidations };
