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


const adminRegisterValidations = (data) => {
	const schema = Joi.object({
		fullname: Joi.string().min(3).max(255).required(),
		username: Joi.string().min(3).max(30).required(),
		email: Joi.string().required().email(),
		password: Joi.string().required()
	});

	return schema.validate(data);
};


const createKnowledgeHub = (data) => {
	const schema = Joi.object({
		crop: Joi.string().required(),
		module: Joi.string().required(),
		title: Joi.string().required(),
		subTitle: Joi.string().required(),
		content: Joi.string().required()
	});

	return schema.validate(data);
};

module.exports = { registerValidations, loginValidations, adminRegisterValidations, createKnowledgeHub };
