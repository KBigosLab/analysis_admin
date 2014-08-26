
var db = require('analysis/db');

exports.expects = {
  nodeIDs:{type:'array','items':{type:'integer'}, required: true},
  command: {type:'string', required: true},
}

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  db.computers.sendCommand($P.args.nodeIDs,$P.args.command);
  $P.json({});
}

