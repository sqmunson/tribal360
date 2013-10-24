T360_config = {
	autoplay : false,
	autoplayOnView : true,
	feedUrl : 'http://tribal360.com/assets/feeder.php?feed=https://buzz60.com/b60-mrss/view/Tribal360%20Feed%20Sports/v5ubzz1anfx95makaz',
	displayAdContainer : 't360_display',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '486406', // test pub id
	openx : '484145', // test pub id
	adapt : 'AiVnje_CA3BJsRMP0_gPXAtRyCRFRZSd', // RON id, tribal360.com targeted to test ad
	utag : true
};

(function(){

	var s = document.createElement('script');
	s.src = 'http://d2s1vwfhtsw5uw.cloudfront.net/assets/loader.min.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();