const config = require('../config');
if (!config.tasks.ftl) return;

const path = require('path');
const gulp = require('gulp');
const changed = require('gulp-changed');
const browserSync = require('browser-sync');
const freemarker = require('gulp-freemarker');

var ftlTask = function () {
  const dest = global.production ? config.root.dest : config.root.tmp;

  const paths = {
    src: path.join(process.cwd(), config.tasks.ftl.src, '**/*'),
    dest: path.join(process.cwd(), dest, config.tasks.ftl.dest),
    viewRoot: path.join(process.cwd(), config.root.src, config.tasks.ftl.viewRoot)
  };

  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(freemarker({
      viewRoot: paths.viewRoot,
      options: {}
    }))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
};

gulp.task('ftl', ftlTask);
module.exports = ftlTask
