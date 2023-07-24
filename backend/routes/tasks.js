const express = require('express');
const router = express.Router();

const { getAllTasks } = require('../controllers/task');

router.get('/all', getAllTasks);

module.exports = router;
