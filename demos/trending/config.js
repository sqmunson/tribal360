T360_config = {
	autoplay : false,
	feedUrl : 'http://tribal360.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Trending/onr2od1q9v5hrlkmwzmz',
	//feedUrl : '../assets/feeder.php?feed=http://travelbig.com/video-feed/',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '483347',
	openx : '474222', // PUBLISHER SPECIFIC, OpenX's 'auid' variable
	adapt : 'spotxTest', // PUB SPECIFIC, need to figure out what parameter we want to use: 'site'?
	//customPixel : 'http://ads.blutonic.com/imptr?id=4257&t=2'
};

(function(){

	var s = document.createElement('script');
	s.src = 'http://d2s1vwfhtsw5uw.cloudfront.net/assets/loader.min.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();