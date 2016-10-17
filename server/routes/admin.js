var Skill=require('../models/skills');
module.exports = {
  get: function (req, res,next) {
    Skill.find({}, function (err, skills) {
      if (err) {
        return next(err);
      }
      console.log(skills);
      res.render('admin',{skills:skills});

    });

  }
};