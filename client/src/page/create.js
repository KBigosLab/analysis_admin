
function create() {
  this.archived = ko.observable(analysis.archived);
  this.canArchive = ko.observable(analysis.canArchive);
  this.hasResults = ko.observable(analysis.hasResults);
  this.hasOutstandingJobs = ko.observable(analysis.hasOutstandingJobs);
  this.hasWorklist = ko.observable(analysis.hasWorklist);
  this.selectedModel = ko.observable(analysis.currentModel);
  this.availableModels = ko.observableArray(analysis.availableModels);
}

create.prototype.archive = function() {
  fs.post('archive',{},function() {
    location.reload();
  });
}

create.prototype.createNewAnalysis = function() {
  fs.post('createNewAnalysis',{
    drugID: this.selectedModel()
  },function() {
    location.reload();
  });
}

create.prototype.resetWorklist = function() {
  fs.post('resetWorklist',{

  },function() {
    location.reload();
  });
}

create.prototype.clearDeadJobs = function() {
  fs.post('clearDeadJobs',{

  },function() {
    location.reload();
  });
}

module.exports = create;

