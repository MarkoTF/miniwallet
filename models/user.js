const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_username: String,
  user_email: String,
  user_password: String,
});

module.exports = mongoose.model('User', UserSchema);
