const fetch = require('node-fetch');
const Key = require('../models/key');
const { web3 } = require('../utils/web3');
const sedTransferDebug = require('debug')('transfer: sendTransfer')

exports.receive = (req, res, next) => {
  Key.findOne({ key_user: req.user._id }, (err, key) => {
    if (err) return next(err);
    res.status(200).render('transferReceive', { key_public: key.key_public });
  });
}

exports.sendScreen = async (req, res, next) => {
  try {
    const keys = await Key.find({ key_user: req.user._id }, 'key_name key_type');
    const keysData = keys.map((current) => {
      const name = `${current.key_name} | ${current.key_type}`;
      return { value: current._id, name: name };
    });
    res.status(200).render('transferSend', { keys: keysData });
  } catch(err) {
    next(err);
  }
}

exports.sendTransfer = async (req, res, next) => {
  try {
    const key = await Key.findById(req.body.account, 'key_private key_public');

    let amount = req.body.amount;
    if (req.body.currency_type != 'ETH') {
      amount = await getEthesFrom(req.body.currency_type, amount);
    }

    const nonce = await web3.eth.getTransactionCount(key.key_public, 'latest');
    const transaction = {
      to: req.body.to,
      value: amount,
      gas: 30000,
      maxPriorityFeePerGas: 1000000108,
      nonce: nonce,
    }

    const signedTx = await web3.eth.accounts.signTransaction(transaction, key.key_private);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, (error, hash) => {
      if (error) throw new Error(err);
      res.status(200).redirect('/');
    });
  } catch (err) {
    next(err);
  }
}

const getEthesFrom = (currency_type, amount) => new Promise((resolve, reject) => {
  const api_key = '4316a2cc33732e1f9df5e545f48c8c40aa4dd914c6d7052b1a4585a0b48b553f';
  fetch(`https://min-api.cryptocompare.com/data/price?fsym=${currency_type}&tsyms=ETH&api_key=${api_key}`)
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      const price = data.ETH * amount;
      const roundedPrice = Math.round(price * Math.pow(10, 18));
      resolve(roundedPrice);
    })
    .catch((err) => {
      reject(err);
    });
});
