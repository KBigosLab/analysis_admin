
exports.getQueryString = function() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    query_string[pair[0]] = pair[1];
  }
  return query_string;
}

// Note: This function requires the '#Crypt' module to be added with include_modules
exports.md5 = function(str) {
  var encryptStr;
  encryptStr = $().crypt({
    method: 'md5',
    source: str
  });
  return encryptStr;
}

exports.parseResult = function(onSuccess,onFail,onInternalFail) {
  return function(result) {
    try {
      // NOTE: This catch for strings may not even be necessary
      if (typeof result == 'string')
        result = JSON.parse(result)
      else result = result;
    } catch(e) {
      result = null;
      var newResult = {error:{
        msg:'Unknown internal error. Please report this as a bug.',
        type:'Internal'
      }};
      alert(newResult.error.msg);
      if (onInternalFail) {
        onInternalFail(newResult);
      }
    }
    if (result != null) {
      if ('success' in result) {
        // For synchronization purposes, check to see if we have a list of syncIDs
        console.log('about to call syncIDs');
        if ('syncIDs' in result) {
          for (var k in result.syncIDs)
            syncIDs[result.syncIDs[k]] = true;
        }

        // Fire the success callback
        if (onSuccess)
          onSuccess(result);
      } else {
        alert(result.error.msg);
        if (onFail) {
          onFail(result);
        }
      }
    }
  }
}

exports.extractURLPath = function(fullPath) {
  var url = fullPath.split('/');
  if (url.length >= 3) {
    url.splice(0,3);
    return url.join('/');
  } else return '';
}

