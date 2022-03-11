const fetch = require('node-fetch');
const Key = require('../models/key');
const { web3 } = require('../utils/web3');
const sedTransferDebug = require('debug')('transfer: sendTransfer')

exports.receive = (req, res, next) => {
  Key.findOne({ key_user: req.user._id }, (err, key) => {
    res.status(200).render('transferReceive', { key_public: key.key_public });
  });
}

exports.sendScreen = (req, res, next) => {
  res.status(200).render('transferSend');
}

exports.sendTransfer = (req, res, next) => {
  Key.findOne({ key_user: req.user._id }, async (err, key) => {

    sedTransferDebug(req.body);
    let amount = req.body.amount;
    if (req.body.currency_type != 'ETH') {
      amount = await getEthesFrom(req.body.currency_type, amount);
      sedTransferDebug(amount);
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
      if (error) sedTransferDebug(err);
      else sedTransferDebug(hash);
      res.status(200).redirect('/');
    });
  });
}

const getEthesFrom = (currency_type, amount) => new Promise((resolve, reject) => {
  sedTransferDebug(currency_type);
  sedTransferDebug(amount);
  const api_key = '4316a2cc33732e1f9df5e545f48c8c40aa4dd914c6d7052b1a4585a0b48b553f';
  fetch(`https://min-api.cryptocompare.com/data/price?fsym=${currency_type}&tsyms=ETH&api_key=${api_key}`)
    .then((result) => {
      return result.json()
    })
    .then((data) => {
      sedTransferDebug('en data');
      sedTransferDebug('no error');
      sedTransferDebug(data);
      const price = data.ETH * amount;
      sedTransferDebug(price);
      resolve(price);
    })
    .catch((err) => {
      sedTransferDebug('error');
      sedTransferDebug(err);
      reject(err);
    });
});
