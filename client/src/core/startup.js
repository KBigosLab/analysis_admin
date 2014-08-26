
function bindLogoutScript() {
  $('#LogOutLink').click(function(e){
    e.preventDefault();
    $.post('logout', {},parseResult(function() {location.replace('/login')}));
  });
}

window.checkQueryString = function() {
  // Query string
  window.urlQuery = getQueryString();

  if ('n' in urlQuery)
    $('.currentDocMenuItem').removeClass('hidden');
}

exports.alwaysRun = function() {
  // Set api version
  fs.setAPIVersion('v0');

  // Set handler for internal server errors (HTTP 500)
  fs.onInternalServerError(function(code,res) {
    if (res) alert(res.error.msg)
    else alert(code+' Server error');
  });

  fs.onConnectionError(function(handler) {
    alert('No internet!');
  });

  // Fired just before an api call is made
  fs.onAPICall(function(resource,data) {
    data.g = groupID;
    data.m = MID;
  });

  // Inject everything exported by common into the global scope
  var common = require('core/common');
  for (var k in common)
    window[k] = common[k];

  // Bind incoming data from the server
  bindData(window);

  // Activate dropdown menus
  $('.dropdown-toggle').dropdown();

  // Bind the logout script
  bindLogoutScript();
}

exports.run = function(page) {
  checkQueryString();

  // Set up the validator
  ko.validation.configure({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: false,
    parseInputAttributes: true,
    messageTemplate: null
  });

  // Handle resizing for the fullscreen div
  function calculateSize() {
    $('#Fullscreen')
      .css('height',($(window).height()-44)+'px')
      .css('width',$(window).width()+'px');
  }
  calculateSize();
  $(window).resize(function() {
    calculateSize();
    $(document).trigger('Fullscreen.Resize');
  });

  // >> Render is based on included javascript file
  fs.mixAppend('#Content',page);

  // Fire this event after the page has been rendered
  $(document).trigger('Page.Rendered');
}

