const config  = require('../config');
const compact = require('lodash/compact');

// Grouped by what can run in parallel
const assetTasks = ['fonts', 'images'];
const codeTasks = ['ftl', 'css', 'scripts'];

module.exports = function(env) {

  function matchFilter(task) {
    if (config.tasks[task]) {
      if (task === 'ftl' && env === 'production') {
        task = 'copyftl';
      }
      if (task === 'scripts') {
        task = env === 'production' ? 'uglify' : 'scripts';
      }
      return task;
    }
  }

  function exists(value) {
    return !!value;
  }

  return {
    assetTasks: compact(assetTasks.map(matchFilter).filter(exists)),
    codeTasks: compact(codeTasks.map(matchFilter).filter(exists))
  };
};
