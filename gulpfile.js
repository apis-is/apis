
var gulp = require('gulp');

// Attach plugins and config to gulp object, simply to have it globally accessible
gulp.plugin = require('gulp-load-plugins')();
gulp.cfg = require('./blender.json');
gulp.cfg.env.dir = gulp.plugin.util.env.prod ? gulp.cfg.env.production.dir : gulp.cfg.env.development.dir;

var loadTasks = require('gulp-load')(gulp);
loadTasks(__dirname);
