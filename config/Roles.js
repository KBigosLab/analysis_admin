
function Roles(parent) {
  this.$P = parent;
  if (parent.verb == 'get')
    this.msgSuffix = 'view this page';
  else this.msgSuffix = 'perform this action';
}

Roles.prototype.login = function(msg) {
  msg = msg || 'You must be logged in to '+this.msgSuffix;
  var $P = this.$P;
  $P.assert(this.$P.loggedIn,new Error(msg));
}

module.exports = Roles;

