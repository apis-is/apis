'use strict';

module.exports = function(gulp) {
  gulp.task('copy', function() {
    var path = gulp.cfg.env.dir;

    gulp.src(gulp.cfg.ico.src)
      .pipe( gulp.dest(path + gulp.cfg.ico.subDir) );

    gulp.src(gulp.cfg.svg.src)
      .pipe( gulp.dest(path + gulp.cfg.svg.subDir) );

    gulp.src(gulp.cfg.fonts.src)
      .pipe( gulp.dest(path + gulp.cfg.fonts.subDir) );
  });
};
