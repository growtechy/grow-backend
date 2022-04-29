const mongoose = require('mongoose');

// Make database connection
module.exports = mongoose.connect(
	process.env.NODE_ENV == 'local' ? process.env.DB_CONNECTION_DEV : process.env.DB_CONNECTION_PROD,
	(error, result) => {
		if (error) return console.log(error);
		console.log('Connected to Database');
	}
);
