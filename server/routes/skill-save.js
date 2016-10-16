var Skill = require('../models/skills');
var util=require('util');
module.exports = {
  post: function (req, res) {
    var reqData = req.body;
    for(var key in reqData){
      if(Object.prototype.hasOwnProperty.call(reqData, key)){
        Skill.findOne({},{list:{$elemMatch:{name:key}}},findSkill);
      }
    }
    res.status(200).send('Данные сохранены');
  }
};

function findSkill(err,data){
  if(err){
    console.log(err);
    throw err;
  }
  console.log(util.inspect(data));
}