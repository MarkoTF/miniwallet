const mongoose = require('mongoose');
const schema = mongoose.Schema;

const KeySchema = new Schema({
  key_public: String,
  key_private: String,
});

module.exports = mongoose.model('Key', KeySchema);
