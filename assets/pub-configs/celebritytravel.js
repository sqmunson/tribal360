T360_config = {
	autoplay : true,
	autoplayOnView : false,
	feedUrl : 'http://cdn.tribal360.com/feeds/entertainment.js',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '495584',
	openx : '495583',
	pixelID: 6,
	adapt : 'AiVnje_CA3BJsRMP0_gPXAtRyCRFRZSd',
	utag : true
};

(function(){

	var s = document.createElement('script');
	s.src = 'http://cdn.tribal360.com/assets/t/loader.min.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();