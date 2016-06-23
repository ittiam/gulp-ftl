const changed    = require('gulp-changed');
const gulp       = require('gulp');
const imagemin   = require('gulp-imagemin');
const config     = require('../config');
const path = require('path');

const imagesTask = function () {
  const dest = global.production ? config.root.dest : config.root.tmp;

  const paths = {
    src: path.join(process.cwd(), config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
    dest: path.join(process.cwd(), dest, config.tasks.images.dest)
  };

  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.dest));
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
