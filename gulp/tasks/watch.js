const config = require('../config');
const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');

const watchTask = function () {
  const watchableTasks = ['fonts', 'scripts', 'images', 'css', 'sass'];

  watchableTasks.forEach(function (taskName) {
    const task = config.tasks[taskName];
    if (task) {
      const extensions = task.extensions ? '.{' + task.extensions.join(',') + '}' : '';
      const glob = path.join(config.root.src, task.src, '**/*' + extensions);

      watch(glob, function () {
        require('./' + taskName)();
      });
    }
  });

  gulp.watch([
    path.join(process.cwd(), config.tasks.ftl.src, '**/*'),
    path.join(process.cwd(), config.root.src, config.tasks.ftl.viewRoot, '**/*.ftl')], ['ftl']);
};

gulp.task('watch', ['server'], watchTask);
module.exports = watchTask;
