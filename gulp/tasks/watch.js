const config = require('../config');
const gulp   = require('gulp');
const path   = require('path');
const watch  = require('gulp-watch');

const watchTask = function() {
  const watchableTasks = ['fonts', 'images', 'ftl', 'css'];

  watchableTasks.forEach(function(taskName) {
    const task = config.tasks[taskName];
    if (task) {
      const extensions = task.extensions ? '.{' + task.extensions.join(',') + '}' : '';
      const glob = path.join(config.root.src, task.src, '**/*' + extensions);
      watch(glob, function() {
       require('./' + taskName)();
      });
    }
  });
};

gulp.task('watch', watchTask);
module.exports = watchTask;
