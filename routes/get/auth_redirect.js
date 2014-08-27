
var db = require('analysis/db');
var auth = require('analysis/auth');

exports.expects = {};

exports.static = true;

/*function getRedirectURL(redirect) {
  return (redirect == 'login') || (redirect == 'register') ? '' : redirect;
}

function makeURL(root,args) {
  var argv = [];
  for (var k in args)
    argv.push(k+'='+args[k]);
  var query = argv.join('&');
  return query ? root+'?'+query : root;
}
*/

function authenticateUser(credentials) {
  if (credentials.type == 'google') {
    if (credentials.emails.length > 0) {
      return db.accounts.getUserID(credentials.emails[0].value);
    } else throw new Error('Could not find email for associated google account.');
  } else throw new Error('Invalid credentials passed to auth_redirect.');
}

exports.main = function($P) {
  // Try to authenticate the user with the given credentials
  var userID = authenticateUser($P.req.user);

  // Perform log in and redirect to the originally requested page
  if (userID) {
    // Perform login
    auth.doLogin($P,userID,1);

    var redirect = $P.auth.redirect != 'login' ? $P.auth.redirect : '/';

    // Clear the auth structure
    $P.auth = null;
    $P.persist();

    // Redirect to page specified in listen_for_login
    $P.res.redirect(redirect);

  // ... otherwise, if the user doesn't exist, return to the login page
  } else {
    // Redirect back to the login page
    $P.res.redirect('/');
  }
}

