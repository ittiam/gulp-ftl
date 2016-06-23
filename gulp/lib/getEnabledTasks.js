const config  = require('../config');
const compact = require('lodash/compact');

// Grouped by what can run in parallel
const assetTasks = ['fonts', 'iconFont', 'images', 'svgSprite'];
const codeTasks = ['ftl', 'css', 'js'];

module.exports = function(env) {

  function matchFilter(task) {
    if(config.tasks[task]) {
      if(task === 'js') {
        task = env === 'production' ? 'uglify' : false;
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
