var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');

gulp.task('test', function() {
    return gulp.src('test.js', {read: false})
      .pipe(mocha({reporter: 'spec', timeout: 10000}));
});

gulp.task('watch', function() {
    nodemon({ script: 'index.js' })
      .on('restart', function () {
          console.log('restarted!');
      });
});
