var gulp   = require('gulp');
var del    = require('del');
var config = require('../config');

var cleanTask = function (cb) {
  del([config.root.tmp]).then(function (paths) {
    cb();
  });
};

var cleanDestTask = function (cb) {
  del([config.root.dest]).then(function (paths) {
    cb();
  });
};

gulp.task('clean:dest', cleanDestTask);
gulp.task('clean', cleanTask);
module.exports = cleanTask;
