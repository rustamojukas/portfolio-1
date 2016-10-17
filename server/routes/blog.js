var Article=require('../models/articles');
module.exports = {
  get: function (req, res,next) {
    Article.find({}, function (err, articles) {
      if (err) {
        return next(err);
      }
      res.render('blog',{articles:articles});
    });
  }
};