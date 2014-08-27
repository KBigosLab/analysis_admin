
function Computer(bind,args) {
  var self = this;
  this.model = args.model;
  this.computer = args.model;
  this.compID = this.model.compID;
  this.monitoring = ko.observable(false);

  bind(this);

  // Create an editable list of questions
  this.list = fs.mixList(this,'.nodeList')
    .source('node','models/NodeView',{
      filter: function(node) {
        return self.compID == node.compID();
      },
    })
  ;

  // Send monitor post requests
  setInterval(function() {
    if (self.monitoring()) {
      $.post('monitor',{
        nodeIDs: self.getNodeIDs(),
      },function() {

      });
    }
  },1000);
}

Computer.prototype.startSignal = function() {
  if (confirm('If the Work and Results directories are empty, click OK to send the start signal.')) {
    this.monitoring(false);
    fs.post('sendCommand',{
      nodeIDs: this.getNodeIDs(),
      command: 'run'
    },function() {
    });
  }
}

Computer.prototype.stopSignal = function() {
  if (confirm('Are you sure? This may require manually killing and restarting CATIEManager.')) {
    this.monitoring(false);
    fs.post('sendCommand',{
      nodeIDs: this.getNodeIDs(),
      command: 'sleep'
    },function() {
    });
  }
}

Computer.prototype.ping = function() {
  this.monitoring(false);
  fs.post('sendCommand',{
    nodeIDs: this.getNodeIDs(),
    command: 'ping'
  },function() {
  });
}

Computer.prototype.monitor = function() {
  this.monitoring(true);
}

Computer.prototype.getNodeIDs = function() {
  var ids = [];
  for (var k in this.list.items) {
    ids.push(this.list.items[k].model.userID);
  }
  return ids;
}

module.exports = Computer;

