const config = require('../config');
if (!config.tasks.rev) return;

const path = require('path');
const gulp = require('gulp');

const RevAll = require('gulp-rev-all');
const revDel = require('gulp-rev-delete-original');

const paths = {
  src: path.join(config.tasks.rev.src, '/**/*'),
  dest: path.join(config.root.dest)
};

const revTask = function() {
  const revAll = new RevAll({
    debug: true,
    prefix: config.tasks.rev.prefix,
    fileNameManifest: 'manifest.json',
    dontRenameFile: config.tasks.rev.dontRenameFile
  });

  return gulp.src(paths.src)
    .pipe(revAll.revision())
    .pipe(gulp.dest(paths.dest))
    .pipe(revDel({
      exclude: /(.html|.htm)$/
    }))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(paths.dest));
}

gulp.task('rev', revTask);
module.exports = revTask;
