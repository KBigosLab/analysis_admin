
var db = require('analysis/db');

exports.requires = function($P) {
  $P.require.login();
}

exports.main = function($P) {
  $P.exports.computerData = db.computers.getComputers();
  $P.exports.nodeData = db.computers.getStatus();
  $P.render();
}

