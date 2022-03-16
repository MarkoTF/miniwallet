const fs = require('fs');
const Key = require('../models/key');
const User = require('../models/user')

exports.removeKey = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id, 'user_password');
    if (user.user_password != req.body.password) {
      res.status(400).send({ error: true, message: 'Contraseña incorrecta' });
      return;
    } 
    const deletedKey = await Key.findByIdAndDelete(req.body.keyId);
    res.status(200).send({ error: null, message: 'Llave eliminada' });
  } catch (err) {
    next(err);
  }
}

exports.getKeysFile = (req, res, next) => {
  // const file = fs.createReadStream(buffer);
  // const myDir = fs.readdir('./temp_files', (err, content) => {
  //   console.log(content);
  // });

  const stat = fs.statSync('./temp_files/example.txt');

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': stat.size
  });

  const file = fs.createReadStream('./temp_files/example.txt');
  // We replaced all the event handlers with a simple call to readStream.pipe()
  file.pipe(res);
}
