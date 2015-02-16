'use strict';

module.exports = function(gulp) {
  gulp.task('styles', function() {
    var gutil = gulp.plugin.util,
        prod  = gutil.env.prod;

    return gulp.src(gulp.cfg.styles.src)
      .pipe( gulp.plugin.plumber() )
      .pipe(
        gulp.plugin.sass({onError: gulp.plugin.notify.onError(function(error) { gulp.plugin.util.beep(); return error; })})
       )
      .pipe(
         gulp.plugin.autoprefixer({
          browsers: ['ie >= 10', '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
          cascade: false
         })
       )
      .pipe( !prod ? gutil.noop() : gulp.plugin.csso() )
      .pipe( gulp.dest(gulp.cfg.env.dir + gulp.cfg.styles.subDir)
      )
      .pipe( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
