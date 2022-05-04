const FarmLocation = require('../models/FarmLocation');

const fetchFarmLocation = async (req, res) => {
	try {
		const getLocation = await FarmLocation.find({ farmType: req.query.farmType, userId: req.query.userId }).sort({
			farmType: 'ASC'
		});

		if (getLocation.length == 0)
			return res.status(200).json({
				data: [],
				message: `You have no location set for your ${req.query.farmType} farm`
			});

		res.status(200).json({
			data: getLocation,
			message: `Success`
		});
	} catch (error) {
		res.status(401).json({
			data: [],
			message: error.message
		});
	}
};

const saveFarmLocation = async (req, res) => {
	try {
		const addLocation = await FarmLocation({
			farmType: req.body.farmType,
			location: req.body.location,
			userId: req.body.userId,
			cordinate: [
				{
					longitude: req.body.longitude,
					latitude: req.body.latitude
				}
			]
		}).save();

		res.status(200).json({
			data: addLocation,
			message: `Your location is stored as ${req.body.location} - [${req.body.longitude +
				',' +
				req.body.latitude}]`
		});
	} catch (error) {
		res.status(401).json({
			data: [],
			message: error.message
		});
	}
};

module.exports = { fetchFarmLocation, saveFarmLocation };
