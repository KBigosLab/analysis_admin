
var sql = require('fusion/sql');

var hist = {};

exports.main = function() {
  // Get the table names that you want to compare
  var setAName = 'results_Olanzapine_IF_CAUC_MDS';
  var setBName = 'results_Olanzapine_IF_CAUC_MDS_samebase';

  // Select both sets of results
  var setA = sql.query('SELECT * FROM '+setAName);
  var setB = sql.query('SELECT * FROM '+setBName);

  // Create an index for quick comparisons
  var geneIndex = {};
  for (var k in setB) {
    geneIndex[setB[k].chromosome+'.'+setB[k].SNPmap] = setB[k].p;
  }

  // Compare setA to setB
  var count = 0;
  for (var k in setA) {
    var idx = setA[k].chromosome+'.'+setA[k].SNPmap;

    var diff = Math.abs(log(setA[k].p) - log(geneIndex[idx]));
    incHist(Math.floor(diff));
  }
  console.log(hist);
}

function log(x) {
  return Math.log(x)/Math.log(10);
}

function incHist(idx) {
  if (idx in hist) hist[idx]++
  else hist[idx] = 1;
}
