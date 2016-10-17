var Work=require('../models/works');
module.exports = {
  get: function (req, res,next) {
    Work.find({}, function (err, work) {
      if (err) {
        return next(err);
      }
      res.render('works',{works:work});
    });
  }
};