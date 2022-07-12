const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const { getTask, addTask, editTask, deleteTask, getAnalytics } = require('../../controllers/TaskController');


router.get('/', auth, getTask);
router.post('/add', auth, addTask);
router.put('/edit/:id', auth, editTask);
router.delete('/delete/:id', auth, deleteTask);
router.get('/analytics', auth, getAnalytics);


module.exports = router;
