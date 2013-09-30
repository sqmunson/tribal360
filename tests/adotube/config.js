T360_config = {
	autoplay : false,
	//feedUrl : '../../assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Sam%20Stella%20Zazoom%20Feed/unw3enu5g83fe5s84gle',
	feedUrl : '../../assets/feeder.php?feed=http://travelbig.com/video-feed/',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '483347',
	openx : '474222', // PUBLISHER SPECIFIC, OpenX's 'auid' variable
	adapt : 'adotubeTest', // PUB SPECIFIC, need to figure out what parameter we want to use: 'site'?
	//customPixel : 'http://ads.blutonic.com/imptr?id=4257&t=2'
};

(function(){

	var s = document.createElement('script');
	s.src = 'loader.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();