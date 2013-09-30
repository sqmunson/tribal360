t360.init({
	//width : 700,
	//height: 400,
	autoplay : false,
	//feedUrl : 'http://tribal360.com/jwJsonParseFeed.php?feed=https://buzz60.com/b60-mrss/view/Sam%20Stella%20Zazoom%20Feed/unw3enu5g83fe5s84gle',
	//feedUrl : 'feeder.php?feed=https://buzz60.com/b60-mrss/view/Sam%20Stella%20Zazoom%20Feed/unw3enu5g83fe5s84gle',
	feedUrl : '../../assets/feeder.php?feed=http://travelbig.com/video-feed/',
	companionArea : 't360_displayAd',
	videoArea : 't360_video',
	openx : '474222',
	adapt : 'integration_test',
	skin : '../../assets/skin/tc_skin.xml'
});

// other variables needed
// - adapt tag/key/id that's unique to each pub
// - openX tag/key/id that's unique to each pub... this goes in the OX.addAdUnit(id) below

// set up OpenX tag and target. they require a global variable, can't put this in a function, arrrgh
var OX_4d6552943f5a4 = OX();
OX_4d6552943f5a4.addAdUnit("474222");
OX_4d6552943f5a4.setAdUnitSlotId("474222","t360_displayAd");