const express = require('express');
const router = express.Router();

const auth = require('../../middleware/adminauth');

const {
    getUserList, getThisUser
} = require('../../controllers/AdminUserListController');

router.get('/', auth, getUserList);
router.get('/:id', auth, getThisUser);

module.exports = router;
