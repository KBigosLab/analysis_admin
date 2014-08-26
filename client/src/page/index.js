
function index(bind,args) {
  bind(this);
  this.dom.append('test');
}

module.exports = index;

