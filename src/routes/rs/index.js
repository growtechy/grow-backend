const express = require('express');
const router = express.Router();

const { fetchTrainingData } = require('../../controllers/RsModelController');

router.get('/', fetchTrainingData);

module.exports = router;
