const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_PRIVATE_KEY || '',
	public_key: process.env.MAILGUN_VALIDATION_KEY || 'pubkey-yourkeyhere'
});

const DOMAIN = process.env.MAILGUN_DOMAIN_LIVE;

const sendMail = async (data) => {
	try {
		await mg.messages.create(DOMAIN, data);
	} catch (error) {
		console.log(error);
	}
};

module.exports = sendMail;
