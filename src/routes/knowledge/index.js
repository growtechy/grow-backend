const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { getKnowledge, seedKnowledge } = require('../../controllers/KnowledgeController');

router.get('/', auth, getKnowledge);
router.post('/seeder', seedKnowledge);

module.exports = router;
