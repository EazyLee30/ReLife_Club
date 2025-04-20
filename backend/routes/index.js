const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => res.send('ReLife Club API is running'));
router.get('/users', userController.getUsers);

module.exports = router; 