
exports.key = {userID : 'integer'};

exports.model = {
  compID: {type:'integer',required:true},
  username: {type:'string',required:true},
  response: {type:'string'},
}

exports.controller = 'models/Node';

exports.requires = function($P,method,id) {
  $P.require.loggedIn();
}

exports.create = function($P) {
}

exports.read = function($P,id) {
  $P.json({});
}

exports.update = function($P,id) {
}

exports.destroy = function($P,id) {
}

