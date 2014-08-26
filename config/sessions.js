
var signature = require('cookie-signature');

exports.cookieParser = null;
exports.sessionStore = null;

var mobileSessions = function(req, res, next) {
  if ('cookie' in req.query) {
    var val = signature.unsign(req.query.cookie,Const.cookieSecret);
    if (val) {
      if ('cookie' in req.headers) {
        var hasCookie = false;
        var cookies = req.headers.cookie.split(';');
        for (var k in cookies) {
          if (cookies[k].trim().search('connect.sid') == 0) {
            cookies[k] = 'connect.sid=s%3A'+encodeURIComponent(req.query.cookie);
            hasCookie = true;
          }
          else cookies[k] = cookies[k].trim();
        }
      } else cookies = ['connect.sid=s%3A'+encodeURIComponent(req.query.cookie)];
      if (!hasCookie) cookies.push('connect.sid=s%3A'+encodeURIComponent(req.query.cookie));
      req.headers.cookie = cookies.join('; ');

      // Make sure that this session id is used
      req.regenerateSessionID = val;
    }
  }
  next();
  return;
}

exports.configure = function(express,app) {
  if (live) {
    var redisStore = require('connect-redis')(express);
    console.log('loading redis');
    app.use(mobileSessions);
    exports.cookieParser = express.cookieParser();
    app.use(exports.cookieParser);
    exports.sessionStore = new redisStore;
    app.use(express.session({ store: exports.sessionStore, secret: Const.cookieSecret }));
  } else {
    // Session support
    app.use(mobileSessions);
    exports.cookieParser = express.cookieParser(Const.cookieSecret);
    app.use(exports.cookieParser);
    exports.sessionStore = new express.session.MemoryStore;
    app.use(express.session({store: exports.sessionStore} ));
  }
}
