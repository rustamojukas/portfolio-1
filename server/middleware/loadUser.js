var User = require('../models/users');

module.exports= function(req,res,next){
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user,function(err,user){
    if(err){
      return next(err);
    }
    req.user=user.login;
    next();
  });
};