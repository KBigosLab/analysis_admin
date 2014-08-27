
var url = require('url');

exports.expects = {
  redirect: {type:'string', required:true},
  persist: {type:'integer',required:true},
}

exports.main = function($P) {
  // Record whether or not this login should persist
  $P.auth.persist = $P.args.persist;

  // Parse the redirect url
  var redirect = url.parse($P.args.redirect);
  console.log('HOST '+redirect.host);

  // A host name should never be present in a redirect url
  if (redirect.host)
    $P.error(new Error('Invalid redirect url!'));

  // Assign the redirect url
  $P.auth.redirect = redirect.href;

  $P.json({});
}

