var mongoose = require('../libs/mongoose');

var skillSchema = new mongoose.Schema({
    title:String,
    percent:Number,
    category:String

});


var Skill = mongoose.model('TestSkill', skillSchema);
module.exports = Skill;
