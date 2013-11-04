T360_config = {
	autoplay : false,
	autoplayOnView : true,
	feedUrl : 'http://d2s1vwfhtsw5uw.cloudfront.net/feeds/entertainment.js',
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
	s.src = 'loader.nocompanion.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();