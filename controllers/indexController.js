const debugIndexScreen = require('debug')('index: indexScreen');
const Key = require('../models/key');
const { web3 } = require('../utils/web3');

exports.indexScreen = async (req, res, next) => {
  Key.findOne({ key_user: req.user._id }, async (err, key) => {
    const blockNumber = await web3.eth.getBlockNumber();
    const myBalance = await web3.eth.getBalance(key.key_public, 'latest');
    res.status(200).render('index', { title: 'Mini criptowallet', balance: myBalance });
  });
}
