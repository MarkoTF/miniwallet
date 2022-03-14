const debugAddKey = require('debug')('account: addkey');
const mongoose = require('mongoose');
const Key = require('../models/key');

exports.addKeyScreen = (req, res, next) => {
  res.status(200).render('accountAddKey');
}

exports.addKey = async (req, res, next) => {
  debugAddKey(req.body);
  const keySchema = new Key({
    ...req.body,
    key_user: req.user._id,
  });

  let message;
  try {
    const newKey = await keySchema.save();
    message = "La llave a sido guardada con éxito";
  } catch(err) {
    debugAddKey(err);
    message = "Ha ocurrido un error al intentar guardar la nueva llave";
  }
  res.status(200).redirect('/'/*, { message: message, type: 'danger' }*/);
}
