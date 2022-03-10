const passport = require('passport');
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const debugSingup = require('debug')('login: signup route');

// Para iniciar sesión
router.get('/signin', loginController.sigInScreen);
router.post('/signin', (req, res, next) => { debugSingup(req.body); next(); }, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login/signin'
}));

// Crear cuenta
router.get('/signup', loginController.signUpScreen);
router.post('/signup', loginController.signUp);

module.exports = router;
