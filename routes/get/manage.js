
var db = require('analysis/db');

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  $P.exports.computerData = db.computers.getComputers();
  $P.exports.nodeData = db.computers.getStatus();

  var hasWorklist = db.analysis.tableExists('worklist');
  $P.exports.currentModelName = hasWorklist ? db.analysis.getCurrentModelName() : '',

  $P.render();
}

