const changed    = require('gulp-changed');
const gulp       = require('gulp');
const gulpif = require('gulp-if');
const imagemin   = require('gulp-imagemin');
const config     = require('../config');
const path = require('path');
const size    = require('gulp-filesize');

const imagesTask = function () {
  const dest = global.production ? config.root.dest : config.root.tmp;

  const paths = {
    src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
    dest: path.join(dest, config.tasks.images.dest)
  };

  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulpif(global.production, imagemin())) // Optimize
    .pipe(gulp.dest(paths.dest))
    .pipe(size());
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
