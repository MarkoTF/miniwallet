const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const mongoose = require('mongoose');
const debugAuth = require('debug')('login:auth');

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, cb) => {
  User.findOne({ user_email: email }).exec((err, user) => {
    if(err) { return cb(null, err); }

    if(!user) {
      return cb(null, false, {message: 'Usuario incorrecto'});
    }

    if(user.user_password != password){
      return cb(null, false, {message: 'Contraseña incorrecta'});
    }

    return cb(null, user, {message: 'logeado'});
  });
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    debugAuth(user);
    cb(null, { id: user._id });
  });
});

passport.deserializeUser((id, cb) => {
  process.nextTick(() => {
    objId = mongoose.Types.ObjectId(id)

    User.findOne({ _id: objId }).exec((err, user) => {
      const { user_password, ...restData } = user._doc;
      if (err){ return cb(err); }
      cb(null, restData);
    });
  });
});
