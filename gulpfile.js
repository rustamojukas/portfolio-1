'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    tasks: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  browserSync: require('browser-sync'),
  buffer: require('vinyl-buffer'),
  merge: require('merge-stream'),
  browserify:require('browserify'),
  source:require('vinyl-source-stream'),
  gp: require('gulp-load-plugins')()
};

$.path.tasks.forEach(function (taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    'sprite:svg',
    $.gulp.parallel(
        'sass',
        // 'pug',
        'js:foundation',
        'browserify',
        'copy:image',
        'copy:fonts',
        'css:foundation',
        'copy:water'
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
