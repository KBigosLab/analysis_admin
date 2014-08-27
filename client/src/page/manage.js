
function manage(bind,args) {
  bind(this);

  fs.load('node',nodeData);
  window.nodeIndex = fs.getIndex('node');

  var computerIndex = fs.index('compID',computerData);

  this.computers = fs.mixList(this,'.computers');
  for (var k in computerIndex) {
    this.computers.push('ui/Computer',{
      model: computerIndex[k],
    });
  }

  setInterval(function() {
    $.post('getStatus',{},function(res) {
      var status = fs.index('userID',res.status);
      for (var k in status) {
        nodeIndex[status[k].userID].response(status[k].response);
      }
    });
  },2000);
}

module.exports = manage;

