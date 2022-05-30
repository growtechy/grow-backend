const express = require('express');
const router = express.Router();

const { getCropList, addCrops } = require('../../controllers/CropController');

router.get('/list', getCropList);
router.post('/add', addCrops);

module.exports = router;
