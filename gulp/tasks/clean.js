const gulp = require('gulp');
const del = require('del');
const config = require('../config');

const cleanTask = function (cb) {
  del([config.root.tmp]).then(function () {
    cb();
  });
};

const cleanDestTask = function (cb) {
  del([config.root.dest]).then(function () {
    cb();
  });
};

gulp.task('clean:dest', cleanDestTask);
gulp.task('clean:dev', cleanTask);
module.exports = cleanTask;
