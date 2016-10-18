var router = require('express').Router();
var async = require('async');
var User = require('./../models/users');

router.get('/',function(req,res){
  res.render('index');
});
router.post('/login',function(req,res){
  var login = req.body.login;
  var password = req.body.password;
  console.log(login, password);
  async.waterfall([
    function (callback) {
      User.findOne({login: login, password: password}, callback);
    },
    function (user, callback) {
      console.log(user);
      if (user) {
        callback(null, user);
      } else {
        res.status(403).send('Вы не хозяин сайта');
      }
    }
  ], function (err, user) {
    if (err) {
      return next(err);
    }
    req.session.user = user._id;
    res.status(200).send('wellcome');
  });
});

module.exports=router;