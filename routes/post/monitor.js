
var db = require('analysis/db');

exports.expects = {
  nodeIDs:{type:'array','items':{type:'integer'}, required: true},
}

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  db.computers.monitor($P.args.nodeIDs);
  $P.json({});
}

