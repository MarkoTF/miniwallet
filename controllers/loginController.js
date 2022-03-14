const debugSingup = require('debug')('login:signup');
const User = require('../models/user');
const Key = require('../models/key');

exports.sigInScreen = (req, res, next) => {
  res.render('signin', {
    title: 'Iniciar sesión',
    signin: true,
    signup: false,
  });
}

// Crear cuenta
exports.signUpScreen = (req, res, next) => {
  res.render('signup', {
    title: 'Crear cuenta',
    signin: false,
    signup: true,
  });
}

exports.signUp = async (req, res, next) => {
  const userSchema = new User({
    user_username: req.body.username,
    user_email: req.body.email,
    user_password: req.body.password,
  });

  try {
    const newUser = await userSchema.save();
    res.status(200).redirect('/');
  } catch(err) {
    next(err);
  }
}
