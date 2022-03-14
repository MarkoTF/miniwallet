const debugIndexScreen = require('debug')('index: indexScreen');
const Key = require('../models/key');
const async = require('async');
const { web3 } = require('../utils/web3');

exports.indexScreen = async (req, res, next) => {
  try {
    const keys = await Key.find({ key_user: req.user._id }, 'key_public key_name key_type');
    const publicKeys = keys.reduce((prev, current) => {
      return [...prev, current._doc];
    }, []);

    const balances = await async.concat(publicKeys, keyBalance);
    res.status(200).render('index', { title: 'Mini criptowallet', balances: balances });
  } catch (err) {
    next(err);
  }
}

const keyBalance = (key, callback) => {
  web3.eth.getBalance(key.key_public, 'latest')
    .then((result) => {
      const key_balance = result * Math.pow(10, -18);
      callback(null, { ...key, key_balance });
    })
    .catch((err) => {
      callback(err);
    });
};
