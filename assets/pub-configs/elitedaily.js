T360_config = {
	autoplay : false,
	autoplayOnView : true,
	feedUrl : 'http://cdn.tribal360.com/feeds/entertainment.js',
	videoArea : 't360_video',
	vpaidFailover : true,
	openxPixel : '489953',
	openx : '489954',
	pixelID: 4,
	adapt : 'H3IEFTyrw3xJm6xrzcLWht70GEaWrG1z',
	utag : true
};

(function(){

	var s = document.createElement('script');
	s.src = 'http://cdn.tribal360.com/assets/t/loader.nocompanion.min.js';
	s.async = true;
	document.getElementsByTagName('head')[0].appendChild(s);

})();