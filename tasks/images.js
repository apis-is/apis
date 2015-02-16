'use strict';

module.exports = function(gulp) {
  gulp.task('images', function() {
    var gutil = gulp.plugin.util,
        prod  = gutil.env.prod,
        imgDir = gulp.cfg.env.dir + gulp.cfg.images.subDir;

    return gulp.src(gulp.cfg.images.src)
      .pipe( gulp.plugin.plumber() )
      .pipe( prod ? gutil.noop() : gulp.plugin.changed(imgDir) )

      .pipe( gulp.dest(imgDir) )
      .pipe( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
