feedUrl = 'http://cdn.tribal360.com/feeds/entertainment.js';
playlistContainer = 't360_playlistContainer';
thumbnailContainer = 't360_thumbnail';
thumbnailItemId = 't360_item';
playerWidth = document.getElementById(videoArea).clientWidth;
playerHeight = playerWidth*0.5625;
playlist = [];
player = ''; // this would be the JW player object

// get feed, pass result to buildPlaylist
get(feedUrl, makePlaylistObject, playlistLoadError);

// load a few custom styles
loadStyles();

// add the mouseover event for triggering thumbnails
addEvent(player, 'mouseover', playlistMouseover);
addEvent(player, 'mouseout', playlistMouseout);

function loadStyles() {

  var style = document.createElement('style'),
    css;
  css = '#'+playlistContainer+' {position: absolute;top:0;display: none;width:100%;}';
  css += '.'+thumbnailContainer+' {zoom: 1;filter: alpha(opacity=50);opacity: 0.5;}';
  css += '.'+thumbnailContainer+':hover {zoom: 1;filter: alpha(opacity=100);opacity: 1;}';
  css += '#'+playlistContainer+' div:hover, #'+playlistContainer+' span:hover {color: #ccc !important;cursor: pointer;}';

  // some IE logic
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
}


function makePlaylistObject(respObj) {
  // function takes in the JS feed file and makes a playlist object

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

  displayPlaylist();

}

function playlistLoadError() {
  //error
}

function displayPlaylist() {
  // function builds the thumbnails and appends to the player element

    var div,
        img,
        span,
        container,
        thumbWidth,
        i;

    container = document.createElement('div');
    container.setAttribute('id', playlistContainer);

    // use this for setting thumbnails based on player size with 10px between each thumbnail
    //thumbWidth = (playerWidth-((playlist.length+1)*10))/playlist.length;

    // use this for makign responsive thumbnails
    thumbWidth = (100 - (2*playlist.length))/playlist.length;

    for (i = 0; i < playlist.length; i++) {
      div = document.createElement('div');
      div.className = thumbnailContainer;
      div.setAttribute('id', thumbnailItemId + i);

      // use this for setting thumbnail size based on player size
      //div.setAttribute('style', 'float:left;width:'+thumbWidth+'px;height:120px;margin: 10px 5px 0px 5px;font-family:sans-serif;font-size:9px;line-height:1.6em;position:relative;overflow:hidden;');

      //use this for making thumbnails responsive...uses % based on the number of thumbnails
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

    // here's where we append the thumbnail container to the player
    // player.appendChild(container);
}

function adjustThumbnail() {
  // function to adjust the css of each thumbnail image so they're as centered as possible and fill the necessary space at any size

  // use this for responsiveness
  this.setAttribute('style', 'min-width:100%;min-height:100%;');

  // use this for calculating based on player size
  // var aspectRatio = this.width/this.height,
  //     newWidth = 120*aspectRatio,
  //     parentWidth = (playerWidth-((playlist.length+1)*10))/playlist.length;
  // if(newWidth > parentWidth) {
  //   this.setAttribute('style', 'width:'+newWidth+'px;left:-'+(newWidth-parentWidth)/2+'px;position:relative;max-width:'+newWidth+'px;');
  // } else {
  //   this.setAttribute('style', 'width:100%;position:relative;');
  // }
}

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