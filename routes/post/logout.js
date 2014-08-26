
var signature = require('cookie-signature');

exports.main = function($P) {
  var time = Date.now();

  // Unset cookie
  if ('loggedIn' in $P.req.cookies) {

    // Delete cookies
    $P.res.cookie('loggedIn', '', {expires: new Date(time-3600*1000)});

    // Set log in to false (even though the destroyed session will take care of this)
    $P.loggedIn = false;
  }

  // End session
  $P.req.session.destroy();
  $P.res.json({success:1});
}

