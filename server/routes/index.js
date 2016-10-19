var checkAuth = require('../middleware/checkAuth');
module.exports = function(app){
  app.use('/',require('./login'));
  app.use('/works',require('./works'));
  app.use('/about-me',require('./about-me'));
  app.use('/blog',require('./blog'));
  app.use('/logout',require('./logout'));
  app.use('/feedback',require('./feedback'));
  app.use('/admin',checkAuth,require('./admin'));
  app.use('/skill',checkAuth,require('./skill'));
  app.use('/article',checkAuth,require('./article'));
  app.use('/test',require('./test'));
};
