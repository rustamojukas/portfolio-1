var mongoose = require('../libs/mongoose');

var userSchema = new mongoose.Schema({
  login:{
    type: String,
    unique : true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  created:{
    type: Date,
    default: Date.now()
  }
});
var User = mongoose.model('User',userSchema);
module.exports = User;