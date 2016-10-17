var checkAuth = require('../middleware/checkAuth');
module.exports = function(app){
  app.get('/',require('./login').get);
  app.get('/works',require('./works').get);
  app.get('/about-me',require('./about-me').get);
  app.get('/blog',require('./blog').get);
  app.post('/login',require('./login').post);
  app.post('/logout',require('./logout').post);
  app.get('/admin',checkAuth,require('./admin').get);
  app.post('/feedback',checkAuth,require('./feedback').post);
  app.post('/skill-save',checkAuth,require('./skill-save').post);
  app.post('/article-save',checkAuth,require('./article-save').post);
};
