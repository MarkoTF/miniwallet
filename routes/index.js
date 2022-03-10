const express = require('express');
const router = express.Router();
const debugIndex = require('debug')('index: index');

/* GET home page. */
router.get('/', (req, res, next) => {
  debugIndex(req.user);
  res.render('index', { title: 'Express' });
});

module.exports = router;
