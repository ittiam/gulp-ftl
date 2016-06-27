const config = require('../config');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const getEnabledTasks = require('../lib/getEnabledTasks');

const productionTask = function (cb) {
  global.production = true;
  const tasks = getEnabledTasks('production');
  gulpSequence('clean:dest', tasks.assetTasks, tasks.codeTasks,
    config.tasks.production.server ? 'server' : false,
    config.tasks.production.rev ? 'rev' : false, 'static', cb);
};

gulp.task('prod', productionTask);
module.exports = productionTask;
