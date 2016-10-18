var router = require('express').Router();
var Skill = require('../models/skills');
var async = require('async');

router.post('/update',function(req,res){
  var skillData = req.body;
  console.log(skillData);
  if(!Object.keys(skillData).length){
    return res.send('Данные не изменены');
  }
  async.each(Object.keys(skillData),function(skill,callback){
    var percent = skillData[skill];
    Skill.update({title:skill},{percent:percent},callback);
  },function(err){
    if(err){
      return res.send('Произошла ошибка');
    }
    res.status(200).send('Данные сохранены');
  });
});

module.exports=router;
