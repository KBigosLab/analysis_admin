
// Dependencies
var express = require('express');
var fusion = require('fusion');
var http = require('http');
var path = require('path');

// Better debug messages
require('debug-trace')({
  always: true,
})

var auth = require('analysis/auth');
var passport = require('passport');
var sessions = require('./config/sessions');

process.env.NODE_ENV = 'production';

var app = express();
app.configure(function(){
  app.set('port', Const.port);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:Const.uploadDir}));

  // Configure sessions including support for mobile "cookie" request syntax
  sessions.configure(express,app);

  // Passport authentication support for fb and gmail login
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);

  // Static files - use the maxAge line for the live site
//  if (!Const.live)
    app.use(express.static(path.join(__dirname, 'client')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

fusion.configure(app,{
  // Default title that shows up on a page when none is specified
  defaultTitle: 'Analysis',

  // Default template used for rendering pages
  defaultTemplateName: 'common',

  // Handler for setting up and routing all HTTP requests
  request: require('./config/request'),

  // Roles defines permissions for various server requests
  require: require('./config/Roles'),

  // Handler for broadcasting synchronization messages across
  // multiple client instances
  sync: require('./config/sync'),

  // Directory that contains RESTful api definitions
  apiDir: 'routes/rest',

  // Custom routes
  customRouters: {get: {
    '/src/*': '/srcrouter',
    '/style/*': '/cssrouter',
  }},

  // Variables that should persist across requests for the same session
  persistVars: {
    loggedIn: false,
    userID: 0,
    groupID: 0,
    timezone: 0,
    lastName: '',
    preferredName: '',
    msg: '',
    browser: null,
    stackedView: false,
    mobile: {},
    auth: {},
    temp: {},
  },

  // Sanity check to make sure globals aren't being leaked
  globalSizeLimit: 42,
});

// Initialize the auth module to handle logins
auth.init(app);
    
var server = http.createServer(app);

server.listen(app.get('port'),'localhost', function(){
  // Add the uncaughtException handler here so the server will shut down
  // in the case that another process is already running
  process.addListener("uncaughtException", function (err) {
    console.error("Uncaught exception: " + err.message);
    console.error(err.stack);
  });

  // Pre-load all methods so that the user doesn't have to wait
  var core = require('fusion/core');
  core.load();
  console.log('Ready');
});

