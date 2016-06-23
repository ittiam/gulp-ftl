const config  = require('../config');
const changed = require('gulp-changed');
const gulp    = require('gulp');
const path    = require('path');

const paths = {
  src: path.join(config.root.src, config.tasks.js.src, '/**/*.{' + config.tasks.js.extensions + '}'),
  dest: path.join(config.root.tmp, config.tasks.js.dest)
};

const scriptTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest));
};

gulp.task('scripts', scriptTask);
module.exports = scriptTask;
