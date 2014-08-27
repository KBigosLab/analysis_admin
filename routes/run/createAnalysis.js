
var db = require('analysis/db');

exports.main = function() {
//  if (!checkAnalysis())
//    return {error: 'Jobs still remain in the worklist table!'};

/*  if (!checkTables())
    return {error: 'The results and worklist tables have not been archived yet from the previous analysis!'};

  // Create tables for next analysis
  createNewAnalysis(20);*/
//  clearWorklist();
  db.analysis.archive();

}

