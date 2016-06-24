'use strict';

const compress = require('compression');
const config = require('../config');
const express = require('express');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpSequence = require('gulp-sequence');
const logger = require('morgan');
const open = require('open');
const path = require('path');
const getEnabledTasks = require('../lib/getEnabledTasks');

const projectRoot = path.resolve(__dirname, '../../');

const serverTask = function(cb) {
  const dest = global.production ? config.root.dest : config.root.tmp;

  const settings = {
    root: path.resolve(process.cwd(), dest),
    port: process.env.PORT || 5000,
    logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
    staticOptions: {
      extensions: ['html'],
      maxAge: '31556926'
    }
  };

  const url = 'http://localhost:' + settings.port + '/' + config.tasks.ftl.dest;

  const tasks = getEnabledTasks('dev');
  gulpSequence('clean', 'ftl', cb);

  const app = express()
    .use(compress())
    .use(logger(settings.logLevel))
    .use(express.static(settings.root, settings.staticOptions))
    .use(require('yog-devtools')({
      view_path: '',    // 避免报错。
      rewrite_file: [path.join(projectRoot, config.root.mock, 'server.conf')],
      data_path: [path.join(projectRoot, config.root.mock)]
    }))

  if (!global.production) {
    app.use(express.static(config.root.src, settings.staticOptions))
  }

  app.listen(settings.port);

  gutil.log('server started on ' + gutil.colors.green(url));
  open(url);
};

gulp.task('server', serverTask);
module.exports = serverTask;
