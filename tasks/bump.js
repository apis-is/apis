'use strict';

module.exports = function(gulp) {
  gulp.task('bump', function() {
    var bumpType = 'patch';
    bumpType = gulp.plugin.util.env.minor ? 'minor' : bumpType;
    bumpType = gulp.plugin.util.env.major ? 'major' : bumpType;
    gulp.src(['./package.json','./bower.json','./blender.json'])
      .pipe( gulp.plugin.plumber() )
      .pipe( gulp.plugin.bump({type:bumpType}) )
      .pipe( gulp.dest('./') );
  });
};
