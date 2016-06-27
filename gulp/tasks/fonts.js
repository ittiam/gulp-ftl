const config = require('../config');
if (!config.tasks.fonts) return;

const changed = require('gulp-changed');
const gulp = require('gulp');
const path = require('path');

const fontsTask = function() {
  const dest = global.production ? config.root.dest : config.root.tmp;

  const paths = {
    src: path.join(config.root.src, config.tasks.fonts.src, '/**/*.{' + config.tasks.fonts.extensions + '}'),
    dest: path.join(dest, config.tasks.fonts.dest)
  }

  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest));
}

gulp.task('fonts', fontsTask);
module.exports = fontsTask;
