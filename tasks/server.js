'use strict';

module.exports = function(gulp) {
  gulp.task('server', ['build'], function() {
    gulp.start('connect','watch');
  });
};
