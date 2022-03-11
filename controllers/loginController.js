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
  // res.render('index', { title: 'Inicio' });
  // debugSingup(req.body);
  const userSchema = new User({
    user_username: req.body.username,
    user_email: req.body.email,
    user_password: req.body.password,
  });

  const newUser = await userSchema.save();

  const keySchema = new Key({
    key_public: req.body.key_public,
    key_private: req.body.key_private,
    key_type: req.body.key_type,
    key_user: userSchema,
  });

  const newKey = await keySchema.save();
  res.status(200).redirect('/');

}
