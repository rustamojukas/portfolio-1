var async = require('async');
var User = require('./../models/users');
module.exports = {
  get: function (req, res) {
    res.render('index');
  },
  post: function (req, res, next) {
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

  }
};