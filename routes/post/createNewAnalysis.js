
var db = require('analysis/db');

exports.expects = {
  drugID: {type:'integer', required: true},
}

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  if (db.analysis.checkTables()) {
    db.analysis.createNewAnalysis($P.args.drugID);
  } else $P.error(new Error('The results and worklist tables have not been archived.'));

  $P.json({});
}

