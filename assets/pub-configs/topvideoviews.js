T360_config = {
	autoplay : false,
	autoplayOnView : true,
	feedUrl : 'http://cdn.tribal360.com/feeds/entertainment.js',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel: '496953',
	pixelID: 3,
	adapt : 'AiVnje_CA3BJsRMP0_gPXJRJT5QEdCo6TnBiHbbScM4TEvJhSYQ8cw==',
	utag : true
};

(function(){

	var s = document.createElement('script');
	s.src = 'http://cdn.tribal360.com/assets/nocompanion.loader.min.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();
