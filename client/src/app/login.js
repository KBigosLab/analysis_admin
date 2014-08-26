
exports.withGoogle = function(redirect) {
  redirect = redirect || extractURLPath(window.location.href);
  $.post('listen_for_login',{
    type:'google',
    redirect: redirect,
    persist:($('#StaySignedIn').hasClass('active')?'1':'0')
  },parseResult(function(result) {
    top.location.href='/auth/google';
  }));
}

