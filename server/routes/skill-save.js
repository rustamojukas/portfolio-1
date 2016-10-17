var Skill = require('../models/skills');
var async = require('async');
module.exports = {
  post: function (req, res, next) {
    var skillData = req.body;
    async.each(Object.keys(skillData),function(skill,callback){
      var percent = skillData[skill];
      Skill.update({title:skill},{percent:percent},callback);
    },function(err){
      if(err){
        return res.send('Произошла ошибка');
      }
      res.status(200).send('Данные сохранены');
    });
  }
};
