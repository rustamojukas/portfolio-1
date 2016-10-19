var router = require('express').Router();
var Work = require('../models/works');
var multer  = require('multer');
var checkAuth = require('../middleware/checkAuth');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload=multer({storage:storage});

router.get('/', function (req, res, next) {
  Work.find(function (err, work) {
    if (err) {
      return next(err);
    }
    res.render('works', {works: work});
  });
});

router.post('/',/*checkAuth,*/upload.array('picture',[1]),function(req,res,next){
  console.log(req.body);
  console.log(req.files[0]);
  res.send(req.files);
});



module.exports = router;