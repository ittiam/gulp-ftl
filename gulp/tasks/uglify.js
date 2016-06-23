const config = require('../config');

const gulp    = require('gulp');
const size    = require('gulp-filesize');
const uglify = require('gulp-uglify');
const path = require('path');

const paths = {
  src: path.join(config.root.src, config.tasks.js.src, '/**/*.{' + config.tasks.js.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.js.dest)
};

var uglifyTask = function() {
  return gulp.src(paths.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest))
    .pipe(size());
}

gulp.task('uglify', uglifyTask);
module.exports = uglifyTask;
