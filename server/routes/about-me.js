var Skill = require('../models/skills');
module.exports = {
  get: function (req, res, next) {
    Skill.find({}, function (err, skills) {
      if (err) {
        return next(err);
      }
      res.render('about-me',{skills:skills});
    });
  }
};