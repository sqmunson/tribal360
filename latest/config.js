T360_config = {
	autoplay : false,
	autoplayOnView : true,
	feedUrl : 'http://tribal360.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Sports/v5ubzz1anfx95makaz',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '483978', // test pub id
	openx : '474222', // test pub id
	adapt : 'AiVnje_CA3BJsRMP0_gPXAtRyCRFRZSd', // RON id, tribal360.com targeted to test ad
	utag : true
};

(function(){

	var s = document.createElement('script');
	s.src = 'loader.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();