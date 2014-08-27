
function NodeView(bind,args) {
  var self = this;
  this.model = args.model;
  this.node = this.model;

  this.status = ko.computed(function() {
    var response = self.node.response();
    if (response == 'Hello World!')
      return response
    else return response;
  });
}

module.exports = NodeView;

