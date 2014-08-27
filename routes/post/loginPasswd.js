
var db = require('analysis/db');
var auth = require('analysis/auth');

exports.expects = {
  email: {type:'string',required:true},
  password: {type:'string',required:true},
}

exports.main = function($P) {
  console.log($P.req.session);
  var login = $P.args.email.toLowerCase();

  // Validate login and password
  var userID = db.accounts.getUserID(login);
  if (userID != 0) {
    if (!db.accounts.authenticate(userID,$P.args.password))
      $P.error(new Error('Invalid login.'),'Login Error');
  } else $P.error(new Error('Invalid login.'),'Login Error');

  if (auth.doLogin($P,userID,0)) {
    $P.json({});
  } else {
    throw $P.error(new Error('Login cookie could not be set. Make sure your browser supports cookies.'),'Login Error');
  }
}

