exports.receive = (req, res, next) => {
  res.status(200).render('transferReceive');
}

exports.send = (req, res, next) => {
  res.status(200).render('transferSend');
}
