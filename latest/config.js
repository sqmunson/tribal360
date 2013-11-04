T360_config = {
	autoplay : false,
	autoplayOnView : true,
	feedUrl : 'http://cdn.tribal360.com/feeds/entertainment.js',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '483978', // test pub id
	pixelID : 1,
	openx : '474222', // test pub id
	adapt : 'AiVnje_CA3BJsRMP0_gPXAtRyCRFRZSd', // RON id, tribal360.com targeted to test ad
	utag : true
};

(function(){

	var s = document.createElement('script');
	s.src = 'http://cdn.tribal360.com/assets/loader.min.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();