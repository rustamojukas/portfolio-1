var Article = require('../models/articles');
module.exports = {
  post: function (req, res,next) {
    console.log(req.body);
    // var title = req.body.title;
    // var date = req.body.date;
    // var text = req.body.text;
    // console.log(title, date, text);
    // var article = new Article({
    //   title: title,
    //   date: new Date(),
    //   text: text
    // });
    // article.save(function (err, data) {
    //   if (err) {
    //     return next(err);
    //   }
    //   console.log(data);
    //   res.status(200).send('Статья успешно добавлена');
    // });
    res.send('sss');

  }
};
