const express = require('express');
const router = express.Router();

const auth = require('../../middleware/adminauth');

const {
    getCropList, addCrops, updateCrop, deleteCrop
} = require('../../controllers/CropController');

router.get('/', auth, getCropList);
router.post('/create', auth, addCrops);
router.put('/update/:id', auth, updateCrop);
router.delete('/delete/:id', auth, deleteCrop);

module.exports = router;
