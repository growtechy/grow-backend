const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { viewProfile, editProfile } = require('../../controllers/UserController');

router.get('/', auth, viewProfile);
router.put('/update', auth, editProfile);

module.exports = router;
