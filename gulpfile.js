var gulp = require('gulp');
var to5 = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('clean', function () {
    return gulp.src('dist/*')
      .pipe(vinylPaths(del));
});

gulp.task('test', ['build'], function() {
    return gulp.src('dist/test.js', {read: false})
      .pipe(mocha({reporter: 'spec', timeout: 10000}));
});

gulp.task('build', ['clean'], function() {
    return gulp.src('src/**/*.js')
      .pipe(to5())
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['default', 'test'], function() {
    gulp.watch('src/**/*.js', ['default', 'test']);  
    nodemon({ script: 'dist/index.js' })
      .on('change', ['build'])
      .on('restart', function () {
          console.log('restarted!');
      });
});

gulp.task('default', ['build']);
