function setupAdaptMobile() {
	var script = document.createElement('script');
	script.src = "http://redir.adap.tv/redir/javascript/jsvpaid.js";
	var target = document.getElementById('playlist');
	target.appendChild(script);

	var environmentVars = {
		maxWrapperLevels  : 5,
		adTagTimeout      : 10,
		videoTimeout      : 30,
		slot              : document.getElementById('container-div')
		// , videoSlot       : document.getElementById('existing-player') // Id of existing HTML5 video player (in-stream case)
		};

	var baseAdTagUrl = "http://ads.adap.tv/a/t/integration_test";
	//var baseAdTagUrl = "http://ads.adap.tv/a/h/TtQ9XavXjOwhlfKSsgM4oPzFXKwYrMRqEUti6lPUIdE=...";
	var params = {
		pageUrl      : "http://www.adap.tv/",
		id           : "[VIDEO_ID]",
		title        : "[VIDEO_TITLE]",
		description  : "[VIDEO_DESCRPTION]",
		duration     : "[VIDEO_DURATION]",
		categories   : "[CATEGORIES]"
	};

	var customParams = {
		key1      : "value1",
		key2      : "value2",
		testkey1  : "ios_ri"
	};

	var creativeData = {
		adTagUrl  : __adaptv__.vpaid.constructAdTag(baseAdTagUrl, params, customParams) // Helper method to append and encode all defined data
	};

	var adaptvVPAIDAd = new __adaptv__.vpaid.VPAIDAd();

	adaptvVPAIDAd.subscribe('AdStarted', function(e) { console.log(e.type); });
	adaptvVPAIDAd.subscribe('AdLoaded', function() {adaptvVPAIDAd.startAd();});
	adaptvVPAIDAd.subscribe('AdStopped', function() { console.log('Ad stopped.');});
	adaptvVPAIDAd.subscribe('AdError', function(e) {console.log(e.type + '! Error code: ' + e.data.errorCode + '. Error message: ' + e.data.errorMessage);});

	adaptvVPAIDAd.initAd(480, 320, -1, -1, creativeData, environmentVars);

}