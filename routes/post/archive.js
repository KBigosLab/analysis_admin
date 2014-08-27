
var db = require('analysis/db');

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  if (db.analysis.check()) {
    db.analysis.archive();
  } else $P.error(new Error('The analysis has not finished all jobs.'));

  $P.json({});
}

