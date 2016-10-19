var router = require('express').Router();
var Article = require('../models/articles');

router.post('/', function (req, res) {
  console.log(req.body);
  var title = req.body.title;
  var date = req.body.date;
  var text = req.body.text;
  console.log(title, date, text);
  var article = new Article({
    title: title,
    date: date,
    text: text
  });
  article.save(function (err, data) {
    if (err) {
      return res.status(403).send('Ошибка при добавлении статьи');
    }
    res.status(200).send('Статья успешно добавлена');
  });
});
module.exports = router;
