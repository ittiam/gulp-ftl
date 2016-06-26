const config = require('../config');
const changed = require('gulp-changed');
const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync');

const paths = {
  src: path.join(config.root.src, config.tasks.scripts.src, '/**/*.{' + config.tasks.scripts.extensions + '}'),
  dest: path.join(config.root.tmp, config.tasks.scripts.dest)
};

const scriptTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
};

gulp.task('scripts', scriptTask);
module.exports = scriptTask;
