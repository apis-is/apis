'use strict';

module.exports = function(gulp) {
  var del = require('del');
  gulp.task('clean', function() {
    return del(gulp.cfg.env.dir + '/**/*', function (err, deletedFiles) {
      gulp.plugin.util.log('Files deleted:', deletedFiles.join(', '));
    });
  });
};
