'use strict';

module.exports = function(gulp) {
  gulp.task('watch', ['connect'], function() {
    gulp.watch(gulp.cfg.styles.watchSrc,['styles']);
    gulp.watch(gulp.cfg.scripts.src,['scripts']);
    gulp.watch([gulp.cfg.templates.watchSrc,gulp.cfg.svg.src],['templates']);
    gulp.watch([gulp.cfg.ico.src,gulp.cfg.svg.src,gulp.cfg.fonts.src],['copy']);
    gulp.watch(gulp.cfg.images.src,['images']);
  });
};
