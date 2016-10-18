var express = require('express');
// var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('./server/libs/config');
var app = express();

app.disable('x-powered-by');
// view engine setup
app.set('views', './source/jade');
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static('./build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
  secret:config.get('session:secret'),
  key:config.get('session:key'),
  resave: config.get('session:resave'),
  saveUninitialized: config.get('session:saveUninitialized'),
  cookie:config.get('session:cookie'),
  store: new MongoStore({mongooseConnection: require('./server/libs/mongoose').connection})
}));
app.use(require('./server/middleware/loadUser'));

require('./server/routes')(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    // if(err.status===404){
    //   return res.redirect('/');
    // }
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  // if(err.status===404){
  //   return res.redirect('/');
  // }
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
