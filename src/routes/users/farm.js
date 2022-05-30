const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { fetchFarmLocation, saveFarmLocation, getSpecificFarm, setupFarm, updateFarm, deleteFarm, myFarm } = require('../../controllers/FarmController');

router.get('/fetch-location', fetchFarmLocation);
router.post('/save-location', saveFarmLocation);
router.get('/get-specific-location/:_id', getSpecificFarm);


router.get('/myfarm', auth, myFarm);
router.post('/setup', auth, setupFarm);
router.put('/update/:id', auth, updateFarm);
router.delete('/delete/:id', auth, deleteFarm);

module.exports = router;
