'use strict';

module.exports = function(gulp) {
  gulp.task('scripts', function() {
    var gutil = gulp.plugin.util,
        prod  = gutil.env.prod,
        notifier = require('node-notifier'),
        map = require('map-stream'),
        lintFilter = gulp.plugin.filter(gulp.cfg.scripts.lint.exclude),
        jsHintReporter,
        jsDir = gulp.cfg.env.dir + gulp.cfg.scripts.subDir;

    jsHintReporter = map(function (file, callback) {
      if (!file.jshint.success) {
        file.jshint.results.forEach(function (err) {
          if (err) {
            notifier.notify({
              title: 'JSHint: ' + err.file.split('/').pop(),
              subtitle: 'Line:' + err.error.line + '/Char:' + err.error.character + ' » ' + err.error.reason,
              message: err.error.evidence
            });
            gulp.plugin.util.beep();
            gutil.log(gutil.colors.red('JSHint') + gutil.colors.yellow(' failed on file: ' + err.file));
            gutil.log(gutil.colors.yellow('Line: ' + err.error.line + ' / Character: ' + err.error.character));
            gutil.log(gutil.colors.yellow('Reason: ' + err.error.reason));
            gutil.log(gutil.colors.yellow(err.error.evidence));
          }
        });
      }
      callback(null, file);
    });

    return gulp.src(gulp.cfg.scripts.src)
      .pipe( gulp.plugin.plumber() )

      .pipe( lintFilter )
      .pipe( gulp.plugin.jshint(gulp.cfg.scripts.lint.config) )
      .pipe( jsHintReporter )
      .pipe( lintFilter.restore() )

      .pipe( prod ? gutil.noop() : gulp.plugin.changed( jsDir ) )
      .pipe( !prod ? gutil.noop() : gulp.plugin.filter(['**/*.js']) )

      .pipe(
        !prod ? gutil.noop() : gulp.plugin.uglify({preserveComments: 'some'})
       )
      .pipe( gulp.dest( jsDir ) )
      .pipe( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
