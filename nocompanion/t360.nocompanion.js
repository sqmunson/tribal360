
//if (!window.console) console = {log: function() {}};

// T360 module
var T360 = (function(){

  // initialize all the variables we'll need
  var me = {},
    videoArea,
    player,
    currentIndex,
    playlist,
    adapt,
    feedUrl,
    autoplay,
    playerWidth,
    playerHeight,
    isAdPlaying,
    skin,
    customPixel,
    logoFile,
    logoLink,
    logoPosition,
    logoHide,
    playlistContainer,
    thumbnailContainer,
    streamStarted,
    thumbnailItemId,
    openxPixelUrl,
    vpaid,
    autoplayOnView,
    utag,
    autoplayOnViewStarted,
    automute,
    pixelTracker,
    pixelID,
    pixelUrl;

  me.init = function(config) {

    // config variables with defaults
    videoArea = config.videoArea || 't360_video';
    autoplay = config.autoplay || false;
    feedUrl = config.feedUrl || 'http://tribal360.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Sam%20Stella%20Zazoom%20Feed/unw3enu5g83fe5s84gle';
    openxPixelUrl = config.openxPixel ? 'http://ox-d.tribal360.com/v/1.0/av?auid='+config.openxPixel : 'http://ox-d.tribal360.com/v/1.0/av?auid=483347';
    adapt = config.adapt || '';
    customPixel = config.customPixel || '';
    skin = config.skin || 'http://d2s1vwfhtsw5uw.cloudfront.net/assets/skin/tc_skin.xml';
    logoFile = config.logoFile || 'http://d2s1vwfhtsw5uw.cloudfront.net/assets/T360logo_58.png';
    logoLink = config.logoLink || 'http://tribal360.com';
    logoPosition = config.logoPosition || 'bottom-left';
    logoHide = config.logoHide || true;
    playlistContainer = config.playlistContainer || 't360_playlistContainer';
    thumbnailContainer = config.thumbnailContainer || 't360_thumbnail';
    thumbnailItemId = config.thumbnailItemId || 't360_item';
    vpaid = config.vpaidFailover ? 'vast_2_0_vpaid_failover' : 'vast_2_0_vpaid';
    autoplayOnView = config.autoplayOnView || false;
    utag = config.utag || false;
    automute = config.automute || false;
    pixelTracker = new Image();
    pixelID = config.pixelID || 1;
    pixelUrl = 'http://secure-temple-8149.herokuapp.com/pixels/'+config.pixelID+'?';

    // dynamic variables
    isMobile = T360_userAgent.isMobileBrowser();
    playerWidth = document.getElementById(videoArea).clientWidth;
    playerHeight = playerWidth*0.5625;

    // internal variables
    currentIndex = 0;
    streamStarted = false;
    playlist = [];
    isAdPlaying = false;
    autoplayOnViewStarted = false;

    if(isMobile) {
      // do nothing right now: no mobile yet
    } else {
      kickThingsOff();
    }

  };

  function kickThingsOff() {

    // get feed, pass result to buildPlaylist
    get(feedUrl, buildPlaylist, playlistLoadError);

    // load a few custom styles
    loadStyles();

  }

  function instantiateDesktop() {

    // set index to 0 (first video)
    currentIndex = 0;

    // setup JW and make it a variable
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
        hide: logoHide,
        margin:'0'
      },
      advertising: {
        client: 'vast',
        //tag: 'http://t-ads.adap.tv/a/t/tribal360llc?artEid='+vpaid+'&categories='+adapt+'&cb=__timestamp__',
        tag: (utag) ? 'http://u-ads.adap.tv/a/h/'+adapt+'?cb=__timestamp__&pageUrl='+encodeURIComponent(location.href)+'&eov=eov' : 'http://t-ads.adap.tv/a/t/tribal360llc?artEid='+vpaid+'&categories='+adapt+'&cb=__timestamp__',
        // companiondiv: { id: companionArea, width: 300, height: 250 },
        admessage: 'Your video will resume in XX seconds.'
      }

    });

    // set player events via JW API

    // fires the stream initiation pixel if it hasn't already
    player.onPlay(streamInitiationPixel);

    // checks to see if we're coming from an ad or just a user pausing the player
    // THIS IS A FIX FOR HW 6.6 because their API is broken and doesn't fire some callbacks
    player.onPlay(function(e) {
      doAdCompleteStuff(e);
    });

    // when one playlist item completes show the next one
    player.onPlaylistComplete(showNextVideo);

    // do some things when an ad has started
    // this is one JW 6.6 callback that IS working
    player.onAdImpression(adHasStarted);

    // JW 6.6 PROBLEM: disabling this call back because it's currently broken
    //player.onAdComplete(adHasEnded);

    // JW 6.6 PROBLEM: disabling this call back because it's currently broken
    //player.onAdClick(adHasBeenClicked);

    // check for automute
    //if(automute) {
      //player.setVolume(0);
      //player.setMute();
      //console.log('should be muted');
    //}

    // do some things when the player is definitely ready
    player.onReady(function() {

      // player is ready, fire that pixel
      pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=player_ready';

      // add scroll event
      //autoplayOnView();
      if(autoplayOnView) {
        addAutoPlayOnViewEvent();
      }

      // display the thumbnails
      displayPlaylist();

      // quick fix because some pubs floated elements directly above the player
      //player.container.parentElement.setAttribute('style', player.container.parentElement.style.cssText+'clear:both;');
      player.container.parentElement.setAttribute('style', 'position: relative; display: block; height: 0;clear:both;padding-bottom:56.25%;');
      //player.container.setAttribute('style', 'position:absolute;top:0;left:0;');

      // add the mouseover event for triggering thumbnails
      addEvent(player.container.parentElement, 'mouseover', playlistMouseover);
      addEvent(player.container.parentElement, 'mouseout', playlistMouseout);
    });
  }

  function addAutoPlayOnViewEvent() {
    if(document.documentElement.getBoundingClientRect().bottom >= player.container.parentElement.getBoundingClientRect().top) {
      player.play();
      autoplayOnViewStarted = true;
    } else {
      addEvent(window, 'scroll', autoplayOnViewHandler);
    }
  }

  function removeAutoplayOnViewEvent() {
    autoplayOnViewStarted = true;
    removeEventHandler(window, 'scroll', autoplayOnViewHandler);
  }

  function removeEventHandler(elem,eventType,handler) {
   if (elem.removeEventListener)
      elem.removeEventListener (eventType,handler,false);
   if (elem.detachEvent)
      elem.detachEvent ('on'+eventType,handler);
  }

  function autoplayOnViewHandler() {
      if(document.documentElement.getBoundingClientRect().bottom >= player.container.parentElement.getBoundingClientRect().top) {
        player.play();
        removeAutoplayOnViewEvent();
        //console.log('we here');
      }
  }

  function loadStyles() {

    var style = document.createElement('style'),
      css = '#'+playlistContainer+' {position: absolute;top:0;display: none;width:100%;} #'+videoArea+' {position:absolute;top:0;left:0;} .'+thumbnailContainer+' {zoom: 1;filter: alpha(opacity=50);opacity: 0.5;} .'+thumbnailContainer+':hover {zoom: 1;filter: alpha(opacity=100);opacity: 1;} #'+playlistContainer+' div:hover, #'+playlistContainer+' span:hover {color: #ccc !important;cursor: pointer;}';

    // some IE logic
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  function buildPlaylist(respObj) {
    debug('buildPlaylist');
    var json = JSON.parse(respObj),
        i;
    for (i = 0; i < json.channel.item.length; i++) {
        playlist[i] = {};
        playlist[i]['id'] = json.channel.item[i]['id'];
        playlist[i]['src'] = [];
        playlist[i]['src'].push(json.channel.item[i]['file']);
        playlist[i]['thumbnail'] = json.channel.item[i]['thumbnail'];
        playlist[i]['poster'] = json.channel.item[i]['poster'];
        playlist[i]['title'] = json.channel.item[i]['title'];
    }

    // we have the playlist ready to go, fire that pixel (unmute)
    pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=playlist_loaded';

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
    debug("displayPlaylist");
    if(playlist.length) {
      var div,
          img,
          span,
          container,
          thumbWidth,
          i;
      container = document.createElement('div');
      container.setAttribute('id', playlistContainer);
      //thumbWidth = (playerWidth-((playlist.length+1)*10))/playlist.length;
      thumbWidth = (100 - (2*playlist.length))/playlist.length;

      for (i = 0; i < playlist.length; i++) {
        div = document.createElement('div');
        div.className = thumbnailContainer;
        div.setAttribute('id', thumbnailItemId + i);
        //div.setAttribute('style', 'float:left;width:'+thumbWidth+'px;height:120px;margin: 10px 5px 0px 5px;font-family:sans-serif;font-size:9px;line-height:1.6em;position:relative;overflow:hidden;');
        div.setAttribute('style', 'float:left;width:'+thumbWidth+'%;height:120px;margin: 2% 1% 0 1%;font-family:sans-serif;font-size:9px;line-height:1.6em;position:relative;overflow:hidden;');
        img = document.createElement('img');
        img.setAttribute('src', playlist[i]['thumbnail']);
        img.onload = adjustThumbnail;
        span = document.createElement('span');
        span.setAttribute('style', 'position: absolute;bottom:0px;display:block;background-color:black;color:#aaaaaa;padding:5%;width:90%;');
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
    this.setAttribute('style', 'min-width:100%;min-height:100%;');
    // var aspectRatio = this.width/this.height,
    //     newWidth = 120*aspectRatio,
    //     parentWidth = (playerWidth-((playlist.length+1)*10))/playlist.length;
    // if(newWidth > parentWidth) {
    //   this.setAttribute('style', 'width:'+newWidth+'px;left:-'+(newWidth-parentWidth)/2+'px;position:relative;max-width:'+newWidth+'px;');
    // } else {
    //   this.setAttribute('style', 'width:100%;position:relative;');
    // }
  }

  function streamInitiationPixel() {
    debug('streamInitiationPixel: CALLED');

    if(!streamStarted) {
      debug('streamInitiationPixel: FIRED');

      // set stream variable to true so that the pixel only fires once per page load
      streamStarted = true;

      // make fake OpenX ad call to get our impression pixel that we use for tracking "stream initiation"
      //get(openxPixelUrl, openxPixelSuccess, openxPixelError);

      pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=stream_init';

      // fire custom pixel is set in config
        if(customPixel) {
          if (customPixel && customPixel.toUpperCase().indexOf("HTTP://") === 0) {
            var fireCustomPixel = new Image();
            fireCustomPixel.src = customPixel;
            // //var rnd = Math.round(Math.random()*100000);
            // customImg = document.createElement('img');
            // customImg.style.visibility = "hidden";
            // customImg.style.position = "absolute";
            // customImg.width = "1";
            // customImg.height = "1";
            // customImg.src = customPixel;
            // //img.src = customPixel + ((url.indexOf('?') > 0) ? '&' : '?') + 'r' + rnd + '=' + rnd;
            // //var container = document.getElementById('imgContainer');
            // //document.appendChild(img);
            // player.container.parentElement.appendChild(customImg);
          }
        }
    }
  }

  function doAdCompleteStuff(e) {
    debug('doAdCompleteStuff');

    // when coming from an ad the 'oldstate' is set to BUFFERING by JW
    if(e.oldstate === 'BUFFERING') {
      adHasEnded();
    }
  }

  function userClickedTheVideo() {
    // this isn't used at the moment
    if(isAdPlaying) {
      player.setControls(true);
    }
  }

  // function openxPixelSuccess(respObj) {
  //   //debug('OpenX pixel success');
  //   fireOpenxPixel( xmlFromString(respObj) );
  // }

  // function fireOpenxPixel(xml) {
  //   var impression = xml.getElementsByTagName("Impression"),
  //     tribalImg,
  //     customImg;
  //   if(impression.length) {
  //     if(impression[0].childNodes[0].data.toUpperCase().indexOf("HTTP://") === 0) {
  //       tribalImg = document.createElement('img');
  //       tribalImg.style.visibility = "hidden";
  //       tribalImg.style.position = "absolute";
  //       tribalImg.width = "1";
  //       tribalImg.height = "1";
  //       tribalImg.src = impression[0].childNodes[0].data;
  //       player.container.parentElement.appendChild(tribalImg);

  //       // fire custom pixel is set in config
  //       if(customPixel) {
  //         if (customPixel && customPixel.toUpperCase().indexOf("HTTP://") === 0) {
  //           //var rnd = Math.round(Math.random()*100000);
  //           customImg = document.createElement('img');
  //           customImg.style.visibility = "hidden";
  //           customImg.style.position = "absolute";
  //           customImg.width = "1";
  //           customImg.height = "1";
  //           customImg.src = customPixel;
  //           //img.src = customPixel + ((url.indexOf('?') > 0) ? '&' : '?') + 'r' + rnd + '=' + rnd;
  //           //var container = document.getElementById('imgContainer');
  //           //document.appendChild(img);
  //           player.container.parentElement.appendChild(customImg);
  //         }
  //       }
  //     }
  //   } else {
  //     // there was no impression found, we need to make another fake OpenX ad call and get impression pixel
  //     // TO DO: add a limit to the number of times it calls OpenX
  //     get(openxPixelUrl, openxPixelSuccess, openxPixelError);
  //   }
  // }

  // function xmlFromString(string) {
  //   debug('xmlFromString');
  //   if (!string)
  //     return false;
  //   var message = "";
  //   if (window.DOMParser) { // all browsers, except IE before version 9
  //     var parser = new DOMParser();
  //     try {
  //       xmlDoc = parser.parseFromString (string, "text/xml");
  //     } catch (e) {
  //       // if text is not well-formed,
  //       // it raises an exception in IE from version 9
  //       debug("XML parsing error.");
  //       return false;
  //     }
  //   } else {  // Internet Explorer before version 9
  //     if (typeof (ActiveXObject) == "undefined") {
  //       debug("Cannot create XMLDocument object");
  //       return false;
  //     }
  //     ids = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument"];
  //     for (var i = 0, il = ids.length; i < il; ++i) {
  //       try {
  //         xmlDoc = new ActiveXObject(ids[i]);
  //         break;
  //       } catch (e) {}
  //     }
  //     if (!xmlDoc) {
  //       debug("Cannot create XMLDocument object");
  //       return false;
  //     }
  //     xmlDoc.loadXML(string);

  //     if (xmlDoc.parseError && xmlDoc.parseError.errorCode !== 0) {
  //       debug("XML Parsing Error: " + xmlDoc.parseError.reason
  //           + " at line " + xmlDoc.parseError.line
  //           + " at position " + xmlDoc.parseError.linepos);
  //       return false;
  //     } else {
  //       if (xmlDoc.documentElement) {
  //         if (xmlDoc.documentElement.nodeName == "parsererror") {
  //           //console.log(xmlDoc.documentElement.childNodes[0].nodeValue);
  //         }
  //       } else {
  //         debug("XML Parsing Error!");
  //       }
  //     }
  //   }
  //   return xmlDoc;
  // }

  // function openxPixelError() {
  //   debug('OpenX pixel error');
  // }

  function playlistMouseover() {
    if(!isAdPlaying){
      document.getElementById(playlistContainer).setAttribute('style', 'display:block;');
    }
  }

  function playlistMouseout() {
    document.getElementById(playlistContainer).setAttribute('style', 'display:none;');
  }

  function addClickEvent(div, playlistItem) {
    addEvent(div, 'click', function() {
        handleClickEvent(parseInt(playlistItem.id));
    });
  }

  function handleClickEvent(index) {

    // load the video corresponding to the clicked thumbnail
    player.load([{file:playlist[index].src[0]}]).play();

    // set the current index to the selected video
    currentIndex = index;
  }

  function playlistLoadError() {
    debug('playlistLoadError');
    pixelTracker.src = pixelUrl + 'event_guid='+guid()+'&event_type=playlist_error';
  }

  function showNextVideo() {
    debug('showNextVideo');

    // if this was the last video then loop back to the first video
    if(parseInt(currentIndex) === playlist.length - 1) {
      currentIndex = 0;
      player.load([{file:playlist[0].src[0]}]).play();
    } else {
      currentIndex++;
      player.load([{file:playlist[currentIndex].src[0]}]).play();
    }
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

  function adHasStarted() {
    debug('ad has started');

    // if(automute) {
    //   if(!player.getMute()) {
    //     player.setMute();
    //     //console.log('ad started, should be muted');
    //   }
    // }

    // turn off playlist mouseover display
    playlistMouseout();

    // ad is playing
    setAdPlaying(true);

    // hide player controls
    hidePlayerControls();

    // call in case this is the first ad at the start of the stream
    streamInitiationPixel();

  }

  function adHasEnded() {
    debug('ad has ended');

    // restore player controls
    showPlayerControls();

    // ad is no longer playing
    setAdPlaying(false);

  }

  // DISABLING this because of JW 6.6 API problem
  // function adHasBeenClicked() {
  //   // turn the controls on, this will give a "your video will resume in XX seconds" message plus the play button
  //   player.setControls(true);
  // }


  // HELPER FUNCTIONS: debug(), get(), addEvent()

  function debug() {
    //console.log(arguments);
  }

  function get(url, onSuccess, onError){
    var local = (url.indexOf('file:') === 0 || (window.location.href.indexOf('file:') === 0 && url.indexOf('http') === -1)),
        xdr,
        request;

    if(T360_userAgent.isIE() && XDomainRequest != 'undefined') {
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

  function guid(){
    var _0x18a1x29 = function (){return Math["\x66\x6C\x6F\x6F\x72"](Math["\x72\x61\x6E\x64\x6F\x6D"]()*0x10000).toString(16);};
    return (_0x18a1x29()+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+"\x2D"+_0x18a1x29()+_0x18a1x29()+_0x18a1x29());
  }

  function addEvent(obj, evt, fnc) {
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

  return me;

}());