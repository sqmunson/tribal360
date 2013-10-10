T360_config = {
	autoplay : true,
	feedUrl : 'http://tribal360.com/assets/feeder.php?feed=http://travelbig.com/video-feed/',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '491074',
	openx : '491073',
	adapt : 'pasta',
};

(function(){

	var s = document.createElement('script');
	s.src = 'http://d2s1vwfhtsw5uw.cloudfront.net/assets/loader.min.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();