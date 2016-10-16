var mongoose = require('../libs/mongoose');

var listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  percent: {
    type: Number,
    required: true
  }
});
var skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  list: [listSchema]

});


var Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;