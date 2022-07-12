const express = require('express');
const router = express.Router();

const auth = require('../../middleware/adminauth');

const {
    getUserList, getThisUser, getAnalytics, getActivity, getTask
} = require('../../controllers/AdminUserListController');

router.get('/', auth, getUserList);
router.get('/:id', auth, getThisUser);
router.get('/analytics/:id', auth, getAnalytics);
router.get('/activity/:id', auth, getActivity);
router.get('/task/:id', auth, getTask);

module.exports = router;
