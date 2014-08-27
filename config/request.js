
var specialPage = require('analysis/core/specialPage');
var ua = require('ua-parser');
var signature = require('cookie-signature');
var sanitize = require('validator').sanitize;

exports.configurePage = function($P) {
  return {
    name:$P.name,
    live: Const.live,
    userID:$P.userID,
    loggedIn:$P.loggedIn,
    title:$P.title,
    inclName:'/src/',
    role:$P.role,
    moduleArg: ($P.MID!=0)?'?m='+$P.MID:'',
    rootUser: 1,
    preferredName:$P.preferredName,
    lastName:$P.lastName,
    isMobile: false,
    isStacked: false,
    groupName:$P.groupName,
    groupID:$P.groupID,
    scripts:$P.scripts,
    styles: $P.styles,
    bundled: Const.bundled,
  }
}

exports.handlePageError = function($P,e,args) {
  // Print the message to the console
  console.error('ERROR: '+e.message);
  console.error(e.stack);
  if (e.details) console.error(e.details);

  // Determine the message the user will see
  if (e.tellUser) {
    var errorObj = {error:{msg:e.message}};
  } else {
    var errorObj = {error:{msg:'Internal server error. It would be greatly appreciated if you report this as a bug.',type:'Internal'}};
    e.httpStatus = 500;
  }

  console.log($P.verb);
  // Route the message based on whether this is a get or post request
  if ($P.verb == 'get')
    specialPage.errorPage($P,errorObj.error.msg)
  else {
    console.log(e.httpStatus);
    if (e.httpStatus)
      $P.res.send(errorObj,e.httpStatus)
    else $P.res.send(errorObj,400);
  }
}


exports.preSession = function($P) {
  // Set access control
  $P.res.header('Access-Control-Allow-Origin','*');
}

exports.loadSession = function($P) {
  if ('store' in $P.req.session) {
    for (var k in $P.req.session.store) {
      $P[k] = $P.req.session.store[k];
    }
  } else {
    // Create an empty page struct
    $P.clear();

    // Check and see if the session can/should be restored
    if (('loggedIn' in $P.req.cookies) && ($P.req.cookies.loggedIn != '0')) {
      // New handling for logins
      var autoLoginKey = signature.unsign($P.req.cookies.loggedIn,Const.cookieSecret);

      // Special handling for old login method
      if (!autoLoginKey)
        autoLoginKey = $P.req.cookies.loggedIn;
    } else var autoLoginKey = $P.req.session.id;
  }

  // Some standard client-side exports
  $P.exports.extend({
    userID: $P.userID,
    bundledSource: Const.bundled,
    serverURL: Const.server,
    timezone: $P.timezone,
    groupID: $P.groupID,
    mediaServer: Const.amazonMedia,
    srcServer: Const.amazonSrc,
    awsAccessKeyId: Const.AWSAccessKeyID,
    serverTimezoneOffset: (new Date()).getTimezoneOffset(),
  });

  // Temporary fix for legacy browser caching... remove later
  if ($P.browser && $P.browser.length == 0) $P.browser = null;

  // Detect the current browser
  // Do a user agent string analysis to figure out what platform/browser is being used
  if (!$P.browser) {
    if ('user-agent' in $P.req.headers) {
      $P.browser = ua.parse($P.req.headers['user-agent']).userAgent;
      $P.browser.ua = $P.req.headers['user-agent'];
    } else $P.browser = {ua:null};
  }

  // Check for the sneaky IE 11 disguise
  if ($P.browser.family == 'Other' && $P.browser.ua.search('Trident') != -1)
    $P.browser.family = 'IE';

  // Special blocks for IE and when the site is undergoing maintenance
  if ($P.browser.family == 'IE') {
    specialPage.blockIE($P);
    return false;
  }

  // If we've made it this far, all is good and we can load the page
  return true;
}

exports.setupEnv = function($P) {
  return true;
}

exports.checkLogin = function($P,script) {
/*  // Check for log in (and if not logged in, use landing template)
  if (!$P.loggedIn) {
//    $P.template = $P.views.landing;

    if ($P.verb == 'get') {
      $P.exports.MID = 0;
      if (script.requires) {
        $P.auth.redirect = $P.req.url;
        specialPage.authenticate($P);
        return false;
      } else return true;
    } else if (!script.requires) return true;
  } else $P.template = $P.commonTemplate;

  return true;*/
  $P.loggedIn = true;
  return true;
}


