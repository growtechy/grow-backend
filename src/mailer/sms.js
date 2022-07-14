const axios = require('axios');

const sendSMS = async (phone, message) => {
	var config = {
		method: 'post',
		url: `${process.env
			.TERMII_BASE_URL}/sms/send?to=${phone}&from=Grow&sms=${message}&type=plain&channel=generic&api_key=${process
				.env.TERMII_API_KEY}`,
		headers: {
			'api-key': `${process.env.TERMII_API_KEY}`,
			Cookie: 'termii-sms=qIPgM1jWI0Wkek2NcMagg75XiNOlJyoJ5RTXza4q'
		}
	};

	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log(error);
		});
};

module.exports = { sendSMS };
