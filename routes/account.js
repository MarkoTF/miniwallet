const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/key/add', accountController.addKeyScreen);
router.post('/key/add', accountController.addKey);

module.exports = router;
