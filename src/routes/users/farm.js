const express = require('express');
const router = express.Router();

const { fetchFarmLocation, saveFarmLocation, getSpecificFarm } = require('../../controllers/FarmController');

router.get('/fetch-location', fetchFarmLocation);
router.post('/save-location', saveFarmLocation);
router.get('/get-specific-location/:_id', getSpecificFarm);

module.exports = router;
