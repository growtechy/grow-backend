const mongoose = require('mongoose');

const FarmLocationSchema = mongoose.Schema({
	userId: {
		type: String,
		default: Math.random().toString(16).substr(2, 32)
	},
	farmType: {
		type: String,
		default: 'NULL'
	},
	location: {
		type: String,
		default: 'NULL'
	},
	cordinate: [
		{
			longitude: {
				type: Number,
				default: 0.0
			},
			latitude: {
				type: Number,
				default: 0.0
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

const FarmLocation = mongoose.model('FarmLocation', FarmLocationSchema);

module.exports = FarmLocation;
