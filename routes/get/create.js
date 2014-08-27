
var db = require('analysis/db');

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  var hasWorklist = db.analysis.tableExists('worklist');
  $P.exports.analysis = {
    canArchive: db.analysis.tableExists('worklist') && db.analysis.check(),
    archived: db.analysis.checkTables(),
    currentModel: hasWorklist ? db.analysis.getCurrentModel() : 0,
    hasOutstandingJobs: db.analysis.hasOutstandingJobs(),
    hasWorklist: hasWorklist,
    hasResults: db.analysis.hasResults(),
    availableModels: db.analysis.getAvailableModels(),
  };
  $P.render();
}

