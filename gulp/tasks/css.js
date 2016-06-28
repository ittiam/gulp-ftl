const config = require('../config');
if (!config.tasks.css) return;

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-cssnano');
const browserSync = require('browser-sync');

const cssTask = function () {
  const dest = global.production ? config.root.dest : config.root.tmp;

  const paths = {
    src: path.join(config.root.src, config.tasks.css.src, '/**/*.css'),
    dest: path.join(dest, config.tasks.css.dest)
  };

  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulpif(global.production, minifyCSS({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream());
}

gulp.task('css', cssTask);
module.exports = cssTask;
