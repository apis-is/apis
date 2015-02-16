'use strict';

module.exports = function(gulp) {
  gulp.task('templates', function() {
    var gutil = gulp.plugin.util,
        prod  = gutil.env.prod,
        data = {
          'env': prod ? 'production' : 'development',
          'flags': gutil.env
        };

    return gulp.src(gulp.cfg.templates.src)
      .pipe( gulp.plugin.plumber() )
      .pipe( gulp.plugin.jade({pretty: false, data: data}) )
      .on('error', gulp.plugin.notify.onError(function(error){
        gulp.plugin.util.beep();
        return error.message.split('\n').pop();
      }))
      .pipe( gulp.dest( gulp.cfg.env.dir) )
      .pipe( prod ? gutil.noop() : gulp.plugin.wait(1000))
      .pipe( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
