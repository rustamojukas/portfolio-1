module.exports = {
  post: function (req, res) {
    console.log(req.body);
    res.status(200).send('Сообщение успешно отправлено');
  }
};