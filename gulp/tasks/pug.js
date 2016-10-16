'use strict';

module.exports = function () {
  $.gulp.task('pug', function () {
    return $.gulp.src(['./source/jade/*.pug','!./source/jade/_*.pug'])
        .pipe($.gp.pug({pretty: true}))
        .on('error', $.gp.notify.onError(function (error) {
          return {
            title: 'Pug',
            message: error.message
          };
        }))
        .pipe($.gulp.dest($.config.root));
        // .pipe($.browserSync.stream());
  });
};
