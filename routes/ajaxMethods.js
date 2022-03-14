const express = require('express');
const router = express.Router();
const ajaxController = require('../controllers/ajaxController');

router.delete('/removekey', ajaxController.removeKey);

module.exports = router;
