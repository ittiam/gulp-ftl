const config = require('../config');
if (!config.tasks.ftl) return;

const path = require('path');
const gulp = require('gulp');
const freemarker = require('gulp-freemarker');

const dest = global.production ? config.root.dest : config.root.tmp;

const paths = {
  src: path.join(process.cwd(), config.tasks.ftl.src, '**/*'),
  dest: path.join(process.cwd(), dest, config.tasks.ftl.dest),
  viewRoot: path.join(process.cwd(), config.root.src, config.tasks.ftl.viewRoot)
};

var ftlTask = function () {
  return gulp.src(paths.src)
    .pipe(freemarker({
      viewRoot: paths.viewRoot,
      options: {}
    }))
    .pipe(gulp.dest(paths.dest));
};

gulp.task('ftl', ftlTask);
module.exports = ftlTask
