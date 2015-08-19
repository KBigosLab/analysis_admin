
var sql = require('fusion/sql');

exports.main = function() {
  var compID = 6;
  var name = 'LieberBillNode';
  for (var k=1;k<=8;k++) {
    sql.query('INSERT INTO users(CompID, Username, Command, Response, Password, LastCheckInOut, RUN_SESSION, YIELD_TIME, IDLE_PERIODS) VALUES (?,?,?,?,?,?,?,?,?)',
      [compID,name+k,'','',process.argv[3],'0000-00-00 00:00:00',1,5,'']);
  }
}

