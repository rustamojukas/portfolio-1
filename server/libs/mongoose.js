var mongoose = require('mongoose');
var config = require('config');
mongoose.Promise = global.Promise;
mongoose.connect(config.get('Mongoose.url'), config.get('Mongoose.options'));

module.exports = mongoose;

