var router = require('express').Router();

router.post('/', function (req, res) {
  console.log(req.body);
  res.status(200).send('Сообщение успешно отправлено');
});
module.exports = router;