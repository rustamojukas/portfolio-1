var mongoose = require('../libs/mongoose');

var workSchema = new mongoose.Schema({
  title:{
    type: String,
    unique : true,
    required: true
  },
  tech:{
    type: String
  },
  pic:{
    type: String
  },
  link:{
    type:String
  }
});
var Work = mongoose.model('Work',workSchema);
module.exports = Work;