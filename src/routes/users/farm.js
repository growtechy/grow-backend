const express = require('express');
const router = express.Router();

const { fetchFarmLocation, saveFarmLocation } = require('../../controllers/FarmController');

router.get('/fetch-location', fetchFarmLocation);
router.post('/save-location', saveFarmLocation);

module.exports = router;
