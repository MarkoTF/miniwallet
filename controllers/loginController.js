const debugSingup = require('debug')('login:signup');
const User = require('../models/user');

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

  try {
    const newUser = await userSchema.save();
    debugSingup(newUser);
    res.status(200).redirect('/');
  } catch(err){
    console.log(err);
    next(err);
  };

}
