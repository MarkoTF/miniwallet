const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeySchema = new Schema({
  key_name: String,
	key_user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  key_public: String,
  key_private: String,
  key_type: {type: String, enum: ['ETH', 'BTC', 'DOG'], default: 'ETH'},
});

module.exports = mongoose.model('Key', KeySchema);
