'use strict';

module.exports = function(gulp) {
  // Warning! Will overwrite any existing styles!
  gulp.task('cress', function() {
    var bower = require('bower');

    return bower.commands.install(['cress','normalize-scss'],{save:true})
      .on('end', function() {

        return gulp.src('./bower_components/cress/src/**/*')
          .pipe( gulp.plugin.plumber() )
          .pipe( gulp.dest(gulp.cfg.styles.srcDir) )
          .on( 'end', function(){
          return gulp.src('./src/views/shared/_head.jade')
            .pipe( gulp.plugin.replace('css/main.css','css/cress.css') )
            .pipe( gulp.dest('./src/views/shared/') );
        });
      });

  });
};
