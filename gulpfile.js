const path = require('path');
const del = require('del');

const gulp = require('gulp');
const freemarker = require('gulp-freemarker');

const RevAll = require('gulp-rev-all');
const revDel = require('gulp-rev-delete-original');

const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-cssnano');

const express = require('express');

const paths = {
  src: {
    dir: 'src',
    css: 'src/css',
    js: 'src/js'
  },
  tmp: {
    dir: '.tmp',
    www: '.tmp/www',
    css: '.tmp/css',
    js: '.tmp/js'
  },
  dev: {
    dir: 'dev',
    www: 'dev/www'
  }
}

// dev
gulp.task('ftl', () => {
  gulp.src('mock/*.json')
    .pipe(freemarker({
      viewRoot: path.join(__dirname, 'src/template'),
      options: {}
    }))
    .pipe(gulp.dest(paths.dev.www));
});

function startExpress() {
  var app = express();
  app.use(express.static(path.join(__dirname, paths.src.dir)));
  app.use(express.static(path.join(__dirname, paths.dev.dir)));
  app.listen(4000);
}

gulp.task('serve', ['ftl'], () => {
  startExpress();
});

// build

gulp.task('minifyCSS', () => {
  return gulp.src('src/css/*')
    .pipe(minifyCSS({
      safe: true,
      reduceTransforms: false,
      advanced: false,
      compatibility: 'ie7',
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(paths.tmp.css))
});

gulp.task('uglify', () => {
  return gulp.src('src/js/*')
    .pipe(uglify())
    .pipe(gulp.dest(paths.tmp.js))
})

gulp.task('rev', () => {
  const revAll = new RevAll({
    debug: false,
    prefix: 'http://static.wdzj.com/wdzj',
    fileNameManifest: 'manifest.json',
    dontRenameFile: ['.html', '.php', '.ftl']
  });

  return gulp.src(['.tmp/**/*'])
    .pipe(revAll.revision())
    .pipe(gulp.dest(paths.tmp.dir))
    .pipe(revDel({
      exclude: /(.html|.htm)$/
    }))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(paths.tmp.dir));
});

gulp.task('html', () => {
  return gulp.src('src/template/**/*.ftl')
    .pipe(gulp.dest(paths.tmp.www))
});

gulp.task('del', () => {
  return del([paths.tmp.dir]);
});


