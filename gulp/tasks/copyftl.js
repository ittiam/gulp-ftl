const config = require('../config');
const changed = require('gulp-changed');
const gulp = require('gulp');
const path = require('path');

const paths = {
  src: path.join(config.root.src, config.tasks.ftl.viewRoot, '/**/*'),
  dest: path.join(config.root.dest, config.tasks.ftl.dest)
};

const copyFtlTask = function () {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('copyftl', copyFtlTask);
module.exports = copyFtlTask;
