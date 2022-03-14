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
