if (!window.console) console = {log: function() {}};

// use the DOM Ready function above to pass in all the loader work ONLY when the document has loaded
(function(){

	var UserAgentManager = {
		user_agent : '',
		exclude_browsers : [],
		browsers_map : [],
		versionSearchString: [],
		browser : '',
		version : '',
		OS : '',
		dataBrowser : [{string: navigator.userAgent,subString: "Chrome",identity: "Chrome"},
			{string: navigator.userAgent,subString: "OmniWeb",versionSearch: "OmniWeb/",identity: "OmniWeb"},
			{string: navigator.vendor,subString: "Apple",identity: "Safari",versionSearch: "Version"  },
			{prop: window.opera,  identity: "Opera",  versionSearch: "Version"},
			{string: navigator.vendor,subString: "iCab",identity: "iCab"},
			{string: navigator.vendor,subString: "KDE",identity: "Konqueror"},
			{string: navigator.userAgent,subString: "Firefox",identity: "Firefox"},
			{string: navigator.vendor,subString: "Camino",identity: "Camino"},
			{string: navigator.userAgent,subString: "Netscape",identity: "Netscape"},
			{string: navigator.userAgent,subString: "MSIE",identity: "MSIE",versionSearch: "MSIE"},
			{string: navigator.userAgent,subString: "Gecko",  identity: "Mozilla",versionSearch: "rv" },
			{string: navigator.userAgent,subString: "Mozilla",identity: "Netscape",versionSearch: "Mozilla"}
		],
		dataOS : [{string: navigator.platform,  subString: "Win",identity: "Windows"},
			{string: navigator.platform,subString: "Mac",identity: "Mac"},
			{string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
			{string: navigator.platform,subString: "Linux",identity: "Linux"}
		],

		init :function() {
			UserAgentManager.browsers_map['IE6'] = 'MSIE 6';
			UserAgentManager.browsers_map['IE7'] = 'MSIE 7';
			UserAgentManager.browsers_map['IE8'] = 'MSIE 8';
			UserAgentManager.browsers_map['IE9'] = 'MSIE 9';
			UserAgentManager.browsers_map['IE10'] = 'MSIE 10';
			UserAgentManager.browsers_map['Chrome'] = 'Chrome';
			UserAgentManager.browsers_map['Firefox'] = 'Firefox' ;
			UserAgentManager.browsers_map['Opera'] = 'Opera' ;
			UserAgentManager.browsers_map['Safari'] = 'Safari' ;
			UserAgentManager.browser = UserAgentManager.searchString(UserAgentManager.dataBrowser) || "An unknown browser";
			UserAgentManager.version = UserAgentManager.searchVersion(navigator.userAgent)|| UserAgentManager.searchVersion(navigator.appVersion) || "an unknown version";
			UserAgentManager.OS = UserAgentManager.searchString(UserAgentManager.dataOS) || "an unknown OS";
			UserAgentManager.user_agent = navigator.userAgent;
		},

		getOS: function(){
			return UserAgentManager.OS;
		},

		getBrowser: function(){
			return UserAgentManager.browser + " " + UserAgentManager.version;
		},

		isIE: function(){
			if( UserAgentManager.browser == "MSIE")
				return true;
			else
				return false;
		},

		isExcludedBrowser: function(){
			for( var i = 0; i < UserAgentManager.exclude_browsers.length; i++ ){
				var regex = new RegExp(UserAgentManager.exclude_browsers[i], 'i');
				if (UserAgentManager.getBrowser().match(regex)) {
					return true;
				}
			}
			return false;
		},

		setExcludeBrowsers: function(exclude_browsers){
			UserAgentManager.exclude_browsers = [];
			for( var i = 0; i < exclude_browsers.length; i++ ){
				UserAgentManager.exclude_browsers.push(UserAgentManager.browsers_map[exclude_browsers[i]]);
			}
		},

		Android: function() {
			if (navigator.userAgent.match(/Android/i)){
				UserAgentManager.user_agent = "Android";
				return true;
			}
			return false;
		},

    BlackBerry: function() {
			if( navigator.userAgent.match(/BlackBerry/i)){
				UserAgentManager.user_agent = "BlackBerry";
				return true;
			}
			return false;
    },

    iOS: function() {
        if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
      UserAgentManager.user_agent = "iPhone|iPad|iPod";
      return true;
        }
        return false;
    },

    Opera: function() {
        if( navigator.userAgent.match(/Opera Mini/i)){
      UserAgentManager.user_agent = "Opera Mini";
      return true;
        }
        return false;
    },

    Windows: function() {
        if(navigator.userAgent.match(/IEMobile/i)){
      UserAgentManager.user_agent = "IEMobile";
      return true;
        }
        return false;
    },

    Tablet: function(){
    if(navigator.userAgent.match(/hp-tablet/i) ){
      UserAgentManager.user_agent = "hp-tablet";
      return true;
        }
        return false;
    },

    OtherMobile: function(){
    if (navigator.userAgent.match(/EudoraWeb/i) || navigator.userAgent.match(/Fennec/i)
    || navigator.userAgent.match(/Minimo/i) ||  navigator.userAgent.match(/POLARIS/i)
    || navigator.userAgent.match(/Kindle/i) || navigator.userAgent.match(/nook browser/i)
    || navigator.userAgent.match(/Silk/i)){
      UserAgentManager.user_agent = "other browser";
      return true;
        }
        return false;
    },

    getUserAgent: function(){
    return UserAgentManager.user_agent;
    },

    isMobileBrowser: function() {
    return (UserAgentManager.Android() || UserAgentManager.BlackBerry()
        || UserAgentManager.iOS() || UserAgentManager.Opera()
        || UserAgentManager.Windows() || UserAgentManager.Tablet() || UserAgentManager.OtherMobile());
    },

   searchString: function (data) {
    for (var i=0 ; i < data.length ; i++){
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      UserAgentManager.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf( UserAgentManager.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring( index + UserAgentManager.versionSearchString.length+1));
		}
	};

	// init user agent check
	UserAgentManager.init();

	// assign results to global variable for later use
	window.T360_userAgent = UserAgentManager;




	function get(url, onSuccess, onError){
    var local = (url.indexOf('file:') === 0 || (window.location.href.indexOf('file:') === 0 && url.indexOf('http') === -1)),
        xdr,
        request;

    if(T360_userAgent.isIE() && XDomainRequest != 'undefined') {
      xdr = new XDomainRequest();
      xdr.onload = function() {
        onSuccess(xdr.responseText);
      };
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

      request = new XMLHttpRequest();

      try {
        request.open('GET', url);
      } catch(e) {
        onError(e);
      }

      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status === 200 || local && request.status === 0) {
            onSuccess(request.responseXML);
          } else {
            if (onError) {
              onError('nah');
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
  }

  function openxPixelSuccess(respObj) {
		//console.log(respObj);
		if(T360_userAgent.isIE() && XDomainRequest != 'undefined') {
			fireOpenxPixel( xmlFromString(respObj) );
		} else {
			fireOpenxPixel( respObj );
		}
    //fireOpenxPixel( xmlFromString(respObj) );
  }

  function fireOpenxPixel(xml) {
  	//console.log(xml);
    var impression = xml.getElementsByTagName("Impression"),
			allTrackingEvents = xml.getElementsByTagName("Tracking"),
			eventName,
			eventObject,
			i;

			if(impression.length && allTrackingEvents.length) {

				eventObject = {
					'impression': impression[0].childNodes[0].data,
					'start':'',
					'midpoint':'',
					'firstQuartile':'',
					'thirdQuartile':'',
					'complete':'',
					'mute':'',
					'unmute':'',
					'pause':'',
					'rewind':'',
					'resume':'',
					'fullscreen':'',
					'expand':'',
					'collapse':''
				};

				for(i = 0; i < allTrackingEvents.length; i++) {
					eventName = allTrackingEvents[i].getAttribute('event');
					if(eventObject.hasOwnProperty(eventName)) {
						eventObject[eventName] = allTrackingEvents[i].childNodes[0].data;
					}
				}

				T360_config.eventObject = eventObject;

				// fire page load pixel ASAP, function defined in IIFE
				firePageLoadPixel();

				// start looking for target divs
				checkForTargets();

				// check for mobile then fire pixel, function defined in IIFE
				checkMobileFirePixel();

			} else {

      // there was no impression found, we need to make another fake OpenX ad call and get impression pixel
      get(openxTracker, openxPixelSuccess, openxPixelError);

    }
  }

  function firePageLoadPixel() {
		// page load, first pixel fired!!
		var img = new Image();
		img.src = T360_config.eventObject['start'];
  }

  function checkMobileFirePixel() {
		var fireMobileCheckPixel = new Image();
		if(!T360_userAgent.isMobileBrowser()) {
			// we're NOT on mobile
			fireMobileCheckPixel.src = T360_config.eventObject['midpoint'];
		} else {
			// we ARE on mobile
			fireMobileCheckPixel.src = T360_config.eventObject['thirdQuartile'];
		}
	}

  function xmlFromString(string) {
    if (!string)
      return false;
    var message = "";
    if (window.DOMParser) {
      var parser = new DOMParser();
      try {
        xmlDoc = parser.parseFromString (string, "text/xml");
      } catch (e) {
        return false;
      }
    } else {
      if (typeof (ActiveXObject) == "undefined") {
        debug("Cannot create XMLDocument object");
        return false;
      }
      ids = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument"];
      for (var i = 0, il = ids.length; i < il; ++i) {
        try {
          xmlDoc = new ActiveXObject(ids[i]);
          break;
        } catch (e) {}
      }
      if (!xmlDoc) {
        debug("Cannot create XMLDocument object");
        return false;
      }
      xmlDoc.loadXML(string);

      if (xmlDoc.parseError && xmlDoc.parseError.errorCode !== 0) {
        return false;
      } else {
        if (xmlDoc.documentElement) {
          if (xmlDoc.documentElement.nodeName == "parsererror") {
          }
        } else {
        }
      }
    }
    return xmlDoc;
  }

  function openxPixelError(ee) {
		//console.log('error here');
		//console.log(ee);
  }



  var openxTracker = T360_config.openxPixel ? 'http://tribal360.com/assets/openxConversion.php?feed=http://ox-d.tribal360.com/v/1.0/av?auid='+T360_config.openxPixel : 'http://ox-d.tribal360.com/v/1.0/av?auid=483347';

  get(openxTracker, openxPixelSuccess, openxPixelError);




	// a function to load dependencies in callbacks
	function loadJS(src, callback) {
		var s = document.createElement('script');
		s.src = src;
		s.async = true;
		s.onreadystatechange = s.onload = function() {
			var state = s.readyState;
				if (!callback.done && (!state || /loaded|complete/.test(state))) {
					callback.done = true;
					callback();
				}
		};
		document.getElementsByTagName('head')[0].appendChild(s);
	}

	var maxChecker = 0;

	function checkForTargets() {

		// we only want to load our scripts if the target divs are there
		if(document.getElementById(T360_config.videoArea) && document.getElementById(T360_config.displayAdContainer)) {

			// we have the target divs, fire the firstQuartile pixel
			var fireTargetDivsPixel = new Image();
			fireTargetDivsPixel.src = T360_config.eventObject['firstQuartile'];

			// we have the target divs, now make sure it's not mobile
			if(!T360_userAgent.isMobileBrowser()) {
				loadEverything();
			}

		} else {

			maxChecker++;

			// only loop for 10 seconds
			if(maxChecker <= 100) {

				// we don't have targets, check again in 100 milliseconds
				setTimeout(checkForTargets, 100);

			}
		}
	}

	// loads everything with dependencies
	function loadEverything() {

		// LOAD MAXMIND and confirm we're in the U.S.
		loadJS('http://j.maxmind.com/app/country.js', function() {
			var country = geoip_country_code();
			//console.log("geo code:" + country);

			if(country === 'US') {

				// we ARE in the U.S.
				var fireGeographyPixel = new Image();
				fireGeographyPixel.src = T360_config.eventObject['complete'];

				// LOAD JW and then set KEY
				loadJS('http://d2s1vwfhtsw5uw.cloudfront.net/assets/jwplayer.js', function() {
					//console.log('loaded jwplayer.js');
					jwplayer.key="O4uKyOWAS48nIe/23zZ9t1+EqL+uT02HD7RZBg==";

					// JW is loaded, fire jw loaded pixel
					var fireJWscriptLoadedPixel = new Image();
					fireJWscriptLoadedPixel.src = T360_config.eventObject['pause'];

					// LOAD OPENX and then add the 'displayAd' div for targeting
					loadJS('http://ox-d.tribal360.com/w/1.0/jstag', function() {
						//console.log('loaded OpenX');
						var fireOpenxScriptLoadedPixel = new Image();
						fireOpenxScriptLoadedPixel.src = T360_config.eventObject['collapse'];

						// LOAD t360 and then add MDot stuff and then CALL t360.init and pass in the config!!
						// loadJS('http://d2s1vwfhtsw5uw.cloudfront.net/assets/t360.min.js', function() {
						loadJS('t360.js', function() {
							//console.log('loaded t360');

							// t360 is loaded, fire that pixel
							var fireT360scriptLoadedPixel = new Image();
							fireT360scriptLoadedPixel.src = T360_config.eventObject['unmute'];

							// init!!!!
							T360.init(T360_config);

							var bim_div = document.createElement('div'),
									bim_script = document.createElement('script'),
									bim_img = document.createElement('img');

							bim_div.className = 'bim_ad_container';
							bim_script.src = 'http://j.bimlocal.com/js-tq/ZQsg?cb='+Math.round(+new Date()/1000);
							bim_img.src = 'http://j.bimlocal.com/tq?s=ZQsg&act=prerequest&cb='+Math.round(+new Date()/1000);

							bim_div.appendChild(bim_script);
							bim_div.appendChild(bim_img);
							document.getElementsByTagName("body")[0].appendChild(bim_div);

							// fire MDot script loaded pixel (mute)
							var fireMDotScriptLoadedPixel = new Image();
							fireMDotScriptLoadedPixel.src = T360_config.eventObject['resume'];

						}); // end t360.js
					}); // end openx.js
				}); // end jwplayer.js
			} else {
				// we AREN'T in U.S.
				var fireNotUSpixel = new Image();
				fireNotUSpixel.src = T360_config.eventObject['mute'];
			} // end geo country IF statement
		}); // end first loadJS()
	} // end loadEverything()



})();