'use strict';

module.exports = function(gulp) {
  var del = require('del');
  gulp.task('clean', function() {
    del(gulp.cfg.env.dir + '/*', function (err, deletedFiles) {
        console.log('Files deleted:', deletedFiles.join(', '));
    });
    return gulp.src(gulp.cfg.env.dir +'/*', {read: false});
  });
};
