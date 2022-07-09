const express = require('express');
const router = express.Router();

const auth = require('../../middleware/adminauth');

const {
    getMenu, getActivity
} = require('../../controllers/AdminDashboardController');

router.get('/', auth, getMenu);
router.get('/activity', auth, getActivity);

module.exports = router;
