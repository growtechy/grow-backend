const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { viewProfile, editProfile, changePassword } = require('../../controllers/UserController');

router.get('/', auth, viewProfile);
router.put('/update', auth, editProfile);
router.put('/change-password', auth, changePassword);

module.exports = router;
