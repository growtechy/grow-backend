const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { getTask, addTask, editTask, deleteTask } = require('../../controllers/TaskController');

router.get('/', auth, getTask);
router.post('/add', auth, addTask);
router.put('/edit/:id', auth, editTask);
router.delete('/delete/:id', auth, deleteTask);

module.exports = router;
