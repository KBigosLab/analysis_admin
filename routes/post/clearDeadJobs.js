
var db = require('analysis/db');

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  db.analysis.clearDeadJobs();

  $P.json({});
}

