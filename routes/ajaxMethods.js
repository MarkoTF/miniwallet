const express = require('express');
const router = express.Router();
const ajaxController = require('../controllers/ajaxController');

router.delete('/removekey', ajaxController.removeKey);
router.get('/getkeyfile', ajaxController.getKeysFile);

module.exports = router;
