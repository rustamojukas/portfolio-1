var router = require('express').Router();
var Work = require('../models/works');

router.get('/', function (req, res, next) {
  Work.find(function (err, work) {
    if (err) {
      return next(err);
    }
    res.render('works', {works: work});
  });
});

module.exports = router;