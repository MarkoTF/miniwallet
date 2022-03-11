const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferControler');

router.get('/receive', transferController.receive);

router.get('/send', transferController.sendScreen);
router.post('/send', transferController.sendTransfer);

module.exports = router;
