T360_config = {
	autoplay : false,
	autoplayOnView : true,
	feedUrl : 'http://cdn.tribal360.com/feeds/entertainment.js',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '494250',
	openx : '494249',
	pixelID: 8,
	adapt : 'AiVnje_CA3BJsRMP0_gPXAtRyCRFRZSd',
	utag : true
};

(function(){

	var s = document.createElement('script');
	s.src = 'http://cdn.tribal360.com/assets/t/loader.min.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();