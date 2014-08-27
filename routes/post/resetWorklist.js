
var db = require('analysis/db');

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  if (db.analysis.clearWorklist())
    $P.json({})
  else $P.error(new Error('The results table is not empty!'));
}

