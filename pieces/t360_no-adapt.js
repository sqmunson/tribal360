
//if (!window.console) console = {log: function() {}};

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
UserAgentManager.init();

var t360 = (function(){

  var me = {},
    videoArea,
    player,
    currentIndex,
    playlist,
    adapt,
    openx,
    feedUrl,
    autoplay,
    playerWidth,
    playerHeight,
    companionArea,
    isAdPlaying,
    skin,
    companion,
    hasCompanionArea,
    logoFile,
    logoLink,
    logoPosition,
    logoHide,
    playlistContainer,
    thumbnailContainer,
    displayAdContainer;

  me.init = function(config) {
    // config variables
    videoArea = config.videoArea || '';
    companionArea = config.companionArea || '';
    hasCompanionArea = document.getElementById(config.companionArea);
    autoplay = config.autoplay || false;
    feedUrl = config.feedUrl || '';
    openx = config.openx || '';
    adapt = config.adapt || '';
    skin = config.skin || '';
    logoFile = config.logoFile || '';
    logoLink = config.logoLink || '';
    logoPosition = config.logoPosition || '';
    logoHide = config.logoHide || '';
    playlistContainer = config.playlistContainer || '';
    thumbnailContainer = config.thumbnailContainer || '';
    displayAdContainer = config.displayAdContainer || '';
    // dynamic variables
    isMobile = UserAgentManager.isMobileBrowser();
    playerWidth = document.getElementById(videoArea).clientWidth;
    playerHeight = playerWidth*0.5625;
    // initial variables
    currentIndex = 0;
    playlist = [];
    isAdPlaying = false;
    companion = false;

    if(isMobile) {
      // do nothing right now: no mobile yet
    } else {
      kickThingsOff();
    }
  };

  function debug() {
    //console.log(arguments);
  }

  function kickThingsOff() {
    get(feedUrl, buildPlaylist, playlistLoadError);
    if(hasCompanionArea) {
      initOpenX();
    }
  }

  me.initOpenX = function() {
    initOpenX();
  };

  function initOpenX() {
    OX_4d6552943f5a4 = OX();
    // OX_4d6552943f5a4.addAdUnit("474222");
    // OX_4d6552943f5a4.setAdUnitSlotId("474222","t360_displayAd");
    OX_4d6552943f5a4.addAdUnit(openx);
    OX_4d6552943f5a4.setAdUnitSlotId(openx,companionArea);
  }

  function instantiateDesktop() {
    currentIndex = 0;
    player = jwplayer(videoArea).setup({
      height: playerHeight,
      width: playerWidth,
      primary: 'flash',
      skin: skin,
      autostart: autoplay,
      playlist: [{
        file: playlist[0].src[0],
        image: playlist[0].poster
      }],
      logo: {
        file: logoFile,
        link: logoLink,
        position: logoPosition,
        hide: logoHide
      },
      advertising: {
        client: 'vast',
        //tag: 'http://t-ads.adap.tv/a/t/integration_test',
        tag: 'http://t-ads.adap.tv/a/t/tribal360llc',
        companiondiv: { id:'t360_displayAd', width: 300, height: 250 },
        admessage: 'Your video will resume in XX seconds.'
      }
      // plugins: {
      //   'http://redir.adap.tv/redir/integrations/jw/adaptvjw6.swf' : {
      //     key: adapt,
      //     companionid: companionArea
      //     //zid: 'inhouse_preroll'
      //   }
      // }
    });
    player.onPlaylistComplete(showNextVideo);
    //player.onBeforePlay(checkForAutoplay);
    player.onAdImpression(adHasStarted);
    player.onAdComplete(adHasEnded);
    player.onAdCompanions(function(e) {
      adHasCompanion(e);
    });
    player.onAdClick(adHasBeenClicked);
    //player.addButton('http://d2s1vwfhtsw5uw.cloudfront.net//assets/T360logo_50.png', '', logoButton, 'tribalLogo');
    player.onReady(function() {
      displayPlaylist();
      createMuteButton();
      addEvent(player.container.parentElement, 'mouseover', playlistMouseover);
      addEvent(player.container.parentElement, 'mouseout', playlistMouseout);
    });
    //fireStartPixel();
    checkForAutoplay();
    // player.onComplete(function(){
    //   if(!autoplay) {
    //     console.log('ITS OVER AND I NEED TO AUTOPLAY');
    //     player.play();
    //   }
    // });
  }

  function checkForAutoplay() {
    if(!autoplay) {
      getNewAd();
      //player.pause(true);
    }
  }

  function fireStartPixel() {
    debug('fireStartPixel');
    // debug(OX.recordAction);
    // OX.recordAction({"cvid":"4104"});
  }

  function playlistMouseover() {
    //debug("OVER");
    if(!t360.isAdPlaying()){
      document.getElementsByClassName(playlistContainer)[0].setAttribute('style', 'display:block;');
    } else {
      document.getElementById('muteButton').setAttribute('class', 't360_muteActive');
    }
  }

  function playlistMouseout() {
    //debug("OUT");
    document.getElementsByClassName(playlistContainer)[0].setAttribute('style', 'display:none;');
    document.getElementById('muteButton').setAttribute('class', 't360_muteHide');
  }

  function logoButton() {
    location.href=logoLink;
  }

  function buildPlaylist(respObj) { // NEED TO ADD ABILITY TO ADD MULTIPLE SOURCE FILES
    debug('buildPlaylist()');
    var json = JSON.parse(respObj),
        _pl = [],
        i;
    for (i = 0; i < json.channel.item.length; i++) {
        _pl[i] = {};
        _pl[i]['id'] = json.channel.item[i]['id'];
        _pl[i]['src'] = [];
        _pl[i]['src'].push(json.channel.item[i]['file']);
        _pl[i]['thumbnail'] = json.channel.item[i]['thumbnail'];
        _pl[i]['poster'] = json.channel.item[i]['poster'];
        _pl[i]['title'] = json.channel.item[i]['title'];
    }
    playlist = _pl;
    startPlayer();
  }

  function startPlayer() {
    if(isMobile) {
      // nothin for now
    } else {
      instantiateDesktop();

    }
  }

  function displayPlaylist() {
    debug("displayPlaylist()");
    if(playlist.length) {
      var div,
          img,
          span,
          container,
          thumbWidth,
          i;
      container = document.createElement('div');
      container.className = playlistContainer;
      thumbWidth = (playerWidth-((playlist.length+1)*10))/playlist.length;

      for (i = 0; i < playlist.length; i++) {
        div = document.createElement('div');
        div.className = thumbnailContainer;
        div.setAttribute('id', 't360_item'+i);
        div.setAttribute('style', 'float:left;width:'+thumbWidth+'px;height:120px;margin: 10px 5px 0px 5px;font-family:sans-serif;font-size:9px;line-height:1.6em;position:relative;overflow:hidden;');
        img = document.createElement('img');
        img.setAttribute('src', playlist[i]['thumbnail']);
        img.onload = adjustThumbnail;
        span = document.createElement('span');
        span.setAttribute('style', 'position: absolute;bottom:0px;display: block;background-color: black;color: #aaa;padding: 5px;width:'+(thumbWidth-10)+'px;');
        span.innerHTML = playlist[i]['title'];
        addClickEvent(div, playlist[i]);
        div.appendChild(img);
        div.appendChild(span);
        container.appendChild(div);
      }
      player.container.parentElement.appendChild(container);
    } else {
      debug('error building playlist');
    }
  }

  function adjustThumbnail() {
    var aspectRatio = this.width/this.height,
        newWidth = 120*aspectRatio,
        parentWidth = (playerWidth-((playlist.length+1)*10))/playlist.length;
    if(newWidth > parentWidth) {
      this.setAttribute('style', 'width:'+newWidth+'px;left:-'+(newWidth-parentWidth)/2+'px;position:relative;');
    } else {
      this.setAttribute('style', 'width:100%;position:relative;');
    }
  }

  function addClickEvent(div, playlistItem) {
    addEvent(div, 'click', function() {
        handleClickEvent(parseInt(playlistItem.id));
    });
  }

  function handleClickEvent(index) {
    debug('handleClickEvent()');
    if(isAdPlaying) {
      debug('you clicked on a thumbnail: ad is currently playing');
      showClickedItem(index);
    } else {
      debug('you clicked on a thumbnail: content is currently playing');
      resetDisplayArea();
    }
    player.load([{file:playlist[index].src[0]}]).play();
    currentIndex = index;
  }

  function showClickedItem(index) {
    var clickedItem = document.getElementById('t360_item'+index),
        activeItem = document.getElementsByClassName('t360_active')[0];
    clickedItem.className = clickedItem.className + ' t360_active';
    if(activeItem) {
      activeItem.className = activeItem.className.split(' ')[0];
    }
  }

  function hideClickedItem() {
    var activeItem = document.getElementsByClassName('t360_active');
    if(activeItem.length) {
      activeItem[0].className = activeItem[0].className.split(' ')[0];
    }
  }

  function playlistLoadError() {
    debug('playlistLoadError()');
  }

  function showNextVideo() {
    debug('showNextVideo()');
    resetDisplayArea();
    if(parseInt(currentIndex) === playlist.length - 1) {
      currentIndex = 0;
      player.load([{file:playlist[0].src[0]}]).play();
    } else {
      currentIndex++;
      player.load([{file:playlist[currentIndex].src[0]}]).play();
    }
  }

  function getNewAd() {
    debug('getNewAd()');
    OX_4d6552943f5a4.setAdUnitSlotId(openx,companionArea);
    OX_4d6552943f5a4.load();
  }

  function resetDisplayArea() {
    // after an OpenX display ad we need to reset the ad area so that #displayAd is avilable for targeting
    document.getElementById(displayAdContainer).innerHTML='<div id="'+companionArea+'"></div>';
  }

  function deleteArea() {
    document.getElementById(displayAdContainer).innerHTML='<div id="'+companionArea+'"></div>';
  }

  function hasCompanion() {
    return companion;
  }

  function setCompanionStatus(bool) {
    companion = bool;
  }

  function setAdPlaying(bool) {
    isAdPlaying = bool;
  }

  function hidePlayerControls() {
    player.setControls(false);
  }

  function showPlayerControls() {
    player.setControls(true);
  }

  me.hasCompanion = function() {
    return hasCompanion();
  };

  me.setCompanionStatus = function(bool) {
    companion = bool;
  };

  me.deleteArea = function() {
    deleteArea();
  };

  me.getNewAd = function() {
    getNewAd();
  };

  me.getFeedUrl = function() {
    return feedUrl;
  };

  me.isAdPlaying = function() {
    return isAdPlaying;
  };

  me.setAdPlaying = function(bool) {
    isAdPlaying = bool;
  };

  me.hideClickedItem = function() {
    hideClickedItem();
  };

  me.playlistMouseout = function() {
    playlistMouseout();
  };
  me.debug = function() {
    debug(arguments);
  };

  me.showMuteButton = function() {
    showMuteButton();
  };
  me.hideMuteButton = function() {
    hideMuteButton();
  };

  function createMuteButton() {
    var button = document.createElement('div');
    button.setAttribute('id', 'muteButton');
    button.setAttribute('class', 't360_muteHide');
    button.setAttribute('style', 'position:absolute;z-index:2001;padding:10px;right:0px;bottom:55px;text-align:center;font-size:14px;background-color:grey;cursor:pointer;');
    //p.el().insertBefore(button, p.el().firstChild);
    player.container.parentElement.appendChild(button);
    addEvent(button, 'click', onMute);
  }

  function showMuteButton() {
    debug('showMuteButton()');
    var button = document.getElementById('muteButton');
    if(player.getMute()) {
      button.innerHTML = "UNMUTE";
    } else {
      button.innerHTML = "MUTE";
    }
  }

  function hideMuteButton() {
    debug('hideMuteButton()');
    //muteButton.setAttribute('style', 'position:absolute;z-index:2001;padding:10px;left:0px;top:20px;text-align:center;font-size:14px;background-color:grey;cursor:pointer;display:none;');
    var muteButton = document.getElementById('muteButton');
    muteButton.setAttribute('class', 't360_muteHide');
    //muteButton.innerHTML = "Mute";
    //muteButton.setAttribute('style', 'position:absolute;z-index:2001;padding:10px;right:0px;bottom:55px;text-align:center;font-size:14px;background-color:grey;cursor:pointer;display:none;');
  }

  function onMute() {
    debug('onMute called');
    if(!player.getMute()) {
      player.setMute(true);
      document.getElementById('muteButton').innerHTML = "UNMUTE";
    } else {
      player.setMute(false);
      document.getElementById('muteButton').innerHTML = "MUTE";
    }
  }

  // HELPER: add event listener helper method
  function addEvent(obj, evt, fnc) { // helper, prolly don't need
      // W3C model
      if (obj.addEventListener) {
          obj.addEventListener(evt, fnc, false);
          return true;
      }
      // Microsoft model
      else if (obj.attachEvent) {
          return obj.attachEvent('on' + evt, fnc);
      }
      // Browser don't support W3C or MSFT model, go on with traditional
      else {
          evt = 'on'+evt;
          if(typeof obj[evt] === 'function'){
              // Object already has a function on traditional
              // Let's wrap it with our own function inside another function
              fnc = (function(f1,f2){
                  return function(){
                      f1.apply(this,arguments);
                      f2.apply(this,arguments);
                  };
              })(obj[evt], fnc);
          }
          obj[evt] = fnc;
          return true;
      }
      //return false;
  }

  // HELPER: ajax function
  function get(url, onSuccess, onError){
    var local = (url.indexOf('file:') === 0 || (window.location.href.indexOf('file:') === 0 && url.indexOf('http') === -1)),
        xdr,
        request;

    if(UserAgentManager.isIE() && XDomainRequest != 'undefined') {
      // use XDomainRequest for IE
      // IE8/9 code here:
      xdr = new XDomainRequest();
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

      request = new XMLHttpRequest();

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
  }


  function adHasStarted() {
    debug('ad started: adaptv_jsstartBreak()');
    playlistMouseout();
    setAdPlaying(true);
    hidePlayerControls();
    showMuteButton();
    // after 1 second check to see if a companion was returned,
    // if it is then it will be automatically shown,
    // if not then get a new OpenX display
    setTimeout(function() {
      if(hasCompanion()) {
        debug('WE HAVE A COMPANION RIGHT AWAY');
      } else {
        getNewAd();
      }
    }, 1000);
  }

  function adHasEnded() {
    debug('ad ended: adaptv_jsbreakEnded()');
    if (t360.isAdPlaying()) {
      debug('ad ran and ended');
    } else {
      debug('no ads were available, moving on');
    }
    showPlayerControls();
    hideMuteButton();
    hideClickedItem();
    setAdPlaying(false);
    setCompanionStatus(false);
    getNewAd();
  }

  function adHasCompanion(e) {
    debug('companion shown');
    debug(e);
    if(e.companions.length) {
      setCompanionStatus(true);
    }
  }

  function adHasBeenClicked() {
    debug('ad clicked');
    debug(player.getState());
    player.setControls(true);
    setTimeout(function() {
      player.play(true);
    },1000);
    //showNextVideo();
  }

  return me;
}());

//t360.init(T360_config);

// global for adapt testing purposes

// function adaptv_jsstartBreak() {
//   t360.debug('ad started: adaptv_jsstartBreak()');
//   t360.playlistMouseout();
//   t360.setAdPlaying(true);

//   // after 1 second check to see if a companion was returned,
//   // if it is then it will be automatically shown,
//   // if not then get a new OpenX display
//   setTimeout(function() {
//     if(t360.hasCompanion()) {
//       t360.debug('WE HAVE A COMPANION RIGHT AWAY');
//     } else {
//       t360.getNewAd();
//     }
//   }, 1000);
// }

// function adaptv_jsbreakEnded() {
//   t360.debug('ad ended: adaptv_jsbreakEnded()');
//   if (t360.isAdPlaying()) {
//     t360.debug('ad ran and ended');
//   } else {
//     t360.debug('no ads were available, moving on');
//   }
//   t360.hideClickedItem();
//   t360.setAdPlaying(false);
//   t360.setCompanionStatus(false);
//   t360.getNewAd();
// }

// function adaptv_jscompanion() {
//   t360.debug('companion shown');
//   t360.setCompanionStatus(true);
// }

// function adaptv_jsclickThru() {
//   t360.debug('ad clicked');
// }

