const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferControler');

router.get('/receive', transferController.receive);
router.get('/send', transferController.send);

module.exports = router;
