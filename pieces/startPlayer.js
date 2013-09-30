
//jwplayer('video');
function instantiateDesktop() {
	t3.currentIndex = 0;
	jwplayer("video").setup({
		height: 400,
		width: 700,
		primary: 'flash',
		autostart: true,
		playlist: [{
			file: t3.playlist[0].src[0]
		}],
		plugins: {
			'http://redir.adap.tv/redir/integrations/jw/adaptvjw6.swf' : {
				key: 'integration_test',
				companionid: 'displayAd'
			}
		},
	});
	jwplayer("video").onPlaylistComplete(showNextVideo);

}

function instantiateMobile() {
	t3.currentIndex = 0;
	jwplayer("video").setup({
		height: 400,
		width: 700,
		primary: 'html5',
		autostart: true,
		playlist: [{
			file: t3.playlist[0].src[0]
		}]
	});
	jwplayer("video").onBeforePlay(setupAdaptMobile);
	jwplayer("video").onPlaylistComplete(showNextVideo);

}

function adaptv_jsbreakEnded(){
  console.log('onAdComplete');
  deleteArea();
  getNewAd();
		// var display = document.getElementById('displayAdContainer');
		// var noscript = document.createElement('noscript');
		// var iframe = document.createElement('iframe');
		// var link = document.createElement('a');
		// var image = document.createElement('img');
		// iframe.setAttribute('id', '521f8b3f992bc');
		// iframe.setAttribute('name', '521f8b3f992bc');
		// iframe.setAttribute('src', 'http://ox-d.tribal360.com/w/1.0/afr?auid=474222&cb=INSERT_RANDOM_NUMBER_HERE');
		// iframe.setAttribute('frameborder', '0');
		// iframe.setAttribute('scrolling', 'no');
		// iframe.setAttribute('width', '300');
		// iframe.setAttribute('height', '250');
		// link.setAttribute('href', 'http://ox-d.tribal360.com/w/1.0/rc?cs=521f8b3f992bc&cb=INSERT_RANDOM_NUMBER_HERE');
		// image.setAttribute('src', "http://ox-d.tribal360.com/w/1.0/ai?auid=474222&cs=521f8b3f992bc&cb=INSERT_RANDOM_NUMBER_HERE");
		// image.setAttribute('border', '0');
		// image.setAttribute('alt', '');
		// link.appendChild(image);
		// iframe.appendChild(link);
		// noscript.appendChild(iframe);

		// display.innerHTML="";
		
		// display.appendChild(noscript);
}


//'http://t-ads.adap.tv/a/t/integration_test'


// plugins: {
// 	'http://redir.adap.tv/redir/integrations/jw/adaptvjw6.swf' : {
// 		key: 'integration_test',
// 		companionid: 'displayAdContainer'
// 	}
// },


		// advertising: {
	 //      client: 'vast',
	 //      //tag: 'http://t-ads.adap.tv/a/t/integration_test',
	 //      companiondiv: { id: 'displayAdContainer', width: 300, height: 250 }
	 //    }
	//  	jwplayer('video').onBeforePlay(function(){
	// 	console.log('onBeforePlay');
	// 	this.playAd('http://t-ads.adap.tv/a/t/integration_test');
	// });