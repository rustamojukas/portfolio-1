'use strict';

module.exports = function() {
  $.gulp.task('serve', function() {
    $.browserSync.init({
      open: true,
      // server: $.config.root
      proxy: "localhost:3000"
    });

    $.browserSync.watch([$.config.root + '/**/*.*', '!**/*.css','source/jade/**/*'], $.browserSync.reload);
  });
};
