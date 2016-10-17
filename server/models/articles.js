var mongoose = require('../libs/mongoose');

var articleSchema = new mongoose.Schema({
  title:{
    type: String,
    // unique : true,
    required: true
  },
  date:{
    type: Date,
    default: Date.now()
  },
  text:{
    type: String
  }
});
var Article = mongoose.model('Article',articleSchema);
module.exports = Article;