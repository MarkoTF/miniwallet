const loginController = require('../controllers/loginController');
const express = require('express');
const router = express.Router();

// GET login page
router.get('/', loginController.logIn);

// POST signin or signup a user
router.post('/', loginController.sign);

module.exports = router;
