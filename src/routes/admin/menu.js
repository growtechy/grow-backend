const express = require('express');
const router = express.Router();

const auth = require('../../middleware/adminauth');

const {
    getMenu, getActivity, generalMessages, sendMessages, userAccountState
} = require('../../controllers/AdminDashboardController');

router.get('/', auth, getMenu);
router.get('/activity', auth, getActivity);
router.post('/messaging', auth, sendMessages);
router.post('/generalmessaging', auth, generalMessages);
router.post('/user-account-state', auth, userAccountState);

module.exports = router;
