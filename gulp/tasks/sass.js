const config = require('../config');
if (!config.tasks.sass) return;

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');
const handleErrors = require('../lib/handleErrors');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-cssnano');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

const sassTask = function () {
  const dest = global.production ? config.root.dest : config.root.tmp;

  const paths = {
    src: path.join(config.root.src, config.tasks.sass.src, '/**/*.{' + config.tasks.sass.extensions + '}'),
    dest: path.join(dest, config.tasks.sass.dest)
  };

  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulpif(global.production, minifyCSS({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('sass', sassTask);
module.exports = sassTask;
