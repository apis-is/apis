'use strict';

module.exports = function(gulp) {
  gulp.task('build', ['clean'], function() {
    return gulp.start('scripts', 'styles', 'templates', 'images', 'copy');
  });
};
