
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

}

module.exports = manage;

