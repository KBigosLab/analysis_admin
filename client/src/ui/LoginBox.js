
var login = require('app/login');

// This module handles either existing user authentication, or new account
// creation.

/**
 * Handles login logic
 *
 *   This class is used by page/authenticate, tabs/LoginTab, and tabs/RegisterTab
 *
 * @api public
 */
var LoginBox = function(bind,args) {
  var self = this;

  this.traditionalLoggingIn = ko.observable(false);

  // Email and password for traditional login
  this.email = ko.observable();
  this.password = ko.observable();

  // By default the traditional login is hidden until a user clicks the link
  // that says they do not have google or facebook
  this.traditionalLoginVisible = ko.observable(false);
}

/**
 * Handler for the google login button
 *
 * @api private
 */
LoginBox.prototype.withGoogle = function() {
  login.withGoogle();
}

/**
 * Handler for the traditional login button
 *
 * @api private
 */
LoginBox.prototype.withPassword = function() {
  var self = this;

  // Validate the `email` and `password` data model
  if (self.email() && self.password()) {
    var params = {};
    params.email = self.email();

    // Fire a post to loginPasswd which will confirm if the login is valid.
    // We md5 hash here and then again on the server for security.
    this.traditionalLoggingIn(true);
    fs.post('loginPasswd',{
      email: self.email(),
      password: md5(self.password()),
    },function(result) {
      // The following is needed so that browsers understand that a new page
      //   is being navigated to after a login where the hashtag stays
      //   the same
      if ((location.pathname == '/login') || (location.pathname == '/register'))
        location.replace('/')
      else window.location.reload();
    },function(result) {
      alert('Invalid login.');

      // If the login failed, delete the password field
      self.password('');

      self.traditionalLoggingIn(false);
    });
  } else {
    // Report any form validation errors
    alert('All fields are required');
  }
}

/**
 * Handler for the link that makes the traditional login visible
 *
 * @api private
 */
LoginBox.prototype.useTraditionalLogin = function() {
  // Set the visible observable for the traditional login box to true
  this.traditionalLoginVisible(true);
}

LoginBox.prototype.logout = function() {
  $.post('logout', {},parseResult(function() {location.replace('/')}));
}

module.exports = LoginBox;

