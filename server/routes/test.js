var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.param('id',function(req,res,next,id){
  req.article_id = id;
  next();
});
router.get('/save',function(req,res){
  res.send(req.article_id+' Deleted');
});
router.get('/delete/:id',function(req,res){
  res.send(req.article_id+' Deleted');
});
router.get('/update/:id',function(req,res){
  res.send(req.article_id+' Updated');
});

module.exports = router;