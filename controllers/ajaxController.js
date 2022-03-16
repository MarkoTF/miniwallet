const fs = require('fs');
const { mkdtemp, writeFile, stat } = require('fs/promises');
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

exports.getKeysFile = async (req, res, next) => {
  try {
    const key = await Key.findById(req.query.keyid, 'key_public key_private');
    const { key_private, key_public } = key._doc;
    const fileContent = `Público: ${key_public}\nPrivado: ${key_private}`;
    const tmpDir = await mkdtemp('./tmp/key-');
    const fullFilePath = `${tmpDir}/key.txt`;
    const keyFile = await writeFile(fullFilePath, fileContent);
    const fileStat = await stat(fullFilePath);

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': fileStat.size
    });

    const file = fs.createReadStream(fullFilePath);
    file.pipe(res);
  } catch(err) {
    next(err);
  }

}
