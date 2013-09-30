// check ajax function in IE8/9/10, not sure if my XDomainRequest() is working

var t3 = {};

t3.get = function(url, onSuccess, onError){
  var local = (url.indexOf('file:') === 0 || (window.location.href.indexOf('file:') === 0 && url.indexOf('http') === -1));

  if(UserAgentManager.isIE() && XDomainRequest != 'undefined') {
    // use XDomainRequest for IE
    // IE8/9 code here:
    var xdr = new XDomainRequest();
    xdr.onload = function() {
      onSuccess(xdr.responseText);
    };
    //console.log(xdr);
    xdr.open('GET', url);
    xdr.send();
  } else {

    if (typeof XMLHttpRequest === 'undefined') {
      window.XMLHttpRequest = function () {
        try { return new window.ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) {}
        try { return new window.ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (f) {}
        try { return new window.ActiveXObject('Msxml2.XMLHTTP'); } catch (g) {}
        throw new Error('This browser does not support XMLHttpRequest.');
      };
    }

    var request = new XMLHttpRequest();

    try {
      request.open('GET', url);
    } catch(e) {
      onError(e);
    }

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200 || local && request.status === 0) {
          onSuccess(request.responseText);
        } else {
          if (onError) {
            onError();
          }
        }
      }
    };

    try {
      request.send();
    } catch(e) {
      if (onError) {
        onError(e);
      } // end if
    } // end try/catch
  } // end else
};