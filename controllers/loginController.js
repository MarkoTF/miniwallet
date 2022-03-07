const debugPost = require('debug')('login:post')
const debugPostCreate = require('debug')('login:postCreate')
const debugGet = require('debug')('login:get')
const debugSignIn = require('debug')('login:signInMethod');
const debugSignUp = require('debug')('login:signUpMethod');

const auth = require('firebase-admin/auth');

exports.logIn = (req, res, next) => {
  res.render('login', { title: 'Iniciar sesión' });
}

exports.sign = (req, res, next) => {
  if ('username' in req.body) {
    signUp(req.body);
  } else {
    signIn(req.body);
  }
  res.status(200).send('ok');
}

const signIn = (credentials) => {
  debugSignIn('que tal %o');
}

const signUp = ({ username, email, gmail }) => {
  auth.getAuth().createUser({
    displayName: username,
    email: email,
    password: password,
  });
}
