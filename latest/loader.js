(function(){

	var maxChecker = 0,
		pixelTracker = new Image(),
		pixelUrl = 'http://secure-temple-8149.herokuapp.com/pixels/'+T360_config.pixelID+'?',
		UserAgentManager = {
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


	if(T360_userAgent.isMobileBrowser()) {
		// we ARE on mobile
		pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=mobile_true';
	} else {
		// we're NOT on mobile
		pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=mobile_false';
		checkForTargets();
	}

	function guid(){
		var _0x18a1x29 = function (){return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);};
		return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
	}


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


	function checkForTargets() {
		// we only want to load our scripts if the target divs are there
		if(document.getElementById(T360_config.videoArea) && document.getElementById(T360_config.displayAdContainer)) {
			// we have the target divs, fire the firstQuartile pixel
			pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=targets_found';
			loadEverything();
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
				pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=US_true';

				// LOAD JW and then set KEY
				loadJS('http://d2s1vwfhtsw5uw.cloudfront.net/assets/jwplayer.js', function() {
					//console.log('loaded jwplayer.js');
					jwplayer.key="O4uKyOWAS48nIe/23zZ9t1+EqL+uT02HD7RZBg==";

					// JW is loaded, fire jw loaded pixel
					pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=jw_loaded';

					// LOAD OPENX and then add the 'displayAd' div for targeting
					loadJS('http://ox-d.tribal360.com/w/1.0/jstag', function() {
						//console.log('loaded OpenX');
						pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=openx_loaded';

						// LOAD t360 and then add MDot stuff and then CALL t360.init and pass in the config!!
						loadJS('http://cdn.tribal360.com/assets/t360.min.js', function() {
						//loadJS('t360.js', function() {
							//console.log('loaded t360');

							// t360 is loaded, fire that pixel
							pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=t360_loaded';

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
							pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=mdot_loaded';

						}); // end t360.js
					}); // end openx.js
				}); // end jwplayer.js
			} else {
				// we AREN'T in U.S.
				pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=US_false';
			} // end geo country IF statement
		}); // end first loadJS()
	} // end loadEverything()

})();