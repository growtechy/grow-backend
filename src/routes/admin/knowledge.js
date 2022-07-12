const express = require('express');
const router = express.Router();

const auth = require('../../middleware/adminauth');

const {
    allHub, createHub, updateHub, deleteHub
} = require('../../controllers/AdminHubController');

router.get('/', auth, allHub);
router.post('/create', auth, createHub);
router.put('/update/:id', auth, updateHub);
router.delete('/delete/:id', auth, deleteHub);

module.exports = router;
