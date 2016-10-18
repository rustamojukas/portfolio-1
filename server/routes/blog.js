var router = require('express').Router();
var Article=require('../models/articles');

router.get('/',function(req,res,next){
  Article.find(function (err, articles) {
    if (err) {
      return next(err);
    }
    res.render('blog',{articles:articles});
  });
});

module.exports=router;