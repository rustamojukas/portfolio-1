var router = require('express').Router();
var Skill = require('../models/skills');

router.get('/', function (req, res, next) {
  Skill.find(function (err, skills) {
    if (err) {
      return next(err);
    }
    res.render('admin', {skills: skills});
  });
});

module.exports = router;
