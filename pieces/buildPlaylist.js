function buildPlaylist(respObj) { // NEED TO ADD ABILITY TO ADD MULTIPLE SOURCE FILES
    //console.log('buildPlaylist()');
    var json = JSON.parse(respObj);
    var _pl = [];
    for (var i = 0; i < json.channel.item.length; i++) {
        _pl[i] = {};
        _pl[i]['id'] = json.channel.item[i]['id'];
        _pl[i]['src'] = [];
        _pl[i]['src'].push(json.channel.item[i]['file']);
        _pl[i]['thumbnail'] = json.channel.item[i]['thumbnail'];
        _pl[i]['poster'] = json.channel.item[i]['poster'];
        _pl[i]['title'] = json.channel.item[i]['title'];
    }
    t3.playlist = _pl;
    displayPlaylist();
  }

  function displayPlaylist() {
    console.log("displayPlaylist()");
    if(t3.playlist.length) {
      var target = document.getElementById('playlist');
      var div,
          img,
          span,
          container,
          displayAd;
      container = document.createElement('div');
      container.className = 'playlistContainer';
      //displayAd = document.createElement('div');
      //displayAd.id = 'displayAdContainer';
      //displayAd.setAttribute('style', 'float:right;width:300px;height:250px;margin: 10px 0 0 10px;background-color:black;');
      for (var i = 0; i < t3.playlist.length; i++) {
        div = document.createElement('div');
        div.className = 'item'+i;
        div.setAttribute('style', 'float:left;width:120px;height:120px;margin: 10px 5px 0px 5px;font-family:sans-serif;font-size:9px;line-height:1.6em;position:relative;');
        img = document.createElement('img');
        img.setAttribute('src', t3.playlist[i]['thumbnail']);
        span = document.createElement('span');
        span.setAttribute('style', 'position: absolute;bottom:0px;display: block;background-color: black;color: #aaa;padding: 5px;');
        span.innerHTML = t3.playlist[i]['title'];
        addClickEvent(div, t3.playlist[i]);
        div.appendChild(img);
        div.appendChild(span);
        container.appendChild(div);
      }
      //target.appendChild(displayAd);
      target.appendChild(container);
      if(UserAgentManager.isMobileBrowser()) {
      //if(true) {
        instantiateMobile();
      } else {
        instantiateDesktop();
      }

    } else {
      console.log('error building playlist');
    }

  }

  function addClickEvent(div, playlistItem) {
    addEvent(div, 'click', function() {
        handleClickEvent(parseInt(playlistItem.id));
    });
  }

  function handleClickEvent(index) {
    console.log('handleClickEvent()');
    deleteArea();
    jwplayer('video').load([{file:t3.playlist[index].src[0]}]);
    t3.currentIndex = index;
    // p.pause();
    // if(p.t3.settings.currentSlot === 'ad') {
    //   p.off('ended', playNextVideo);
    // }
    // if(p.t3.settings.currentSlot === 'video') {
    //   p.off('ended', videoEnded);
    // }
    // setVideoIndex(index);
  }

  function playlistLoadError() {
    console.log('playlistLoadError');
  }



  t3.get('http://tribal360.com/jwJsonParseFeed.php?feed=https://buzz60.com/b60-mrss/view/Sam%20Stella%20Zazoom%20Feed/unw3enu5g83fe5s84gle', buildPlaylist, playlistLoadError);