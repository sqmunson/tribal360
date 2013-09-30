	var OX_4d6552943f5a4 = OX();
	OX_4d6552943f5a4.addAdUnit("474222");
	OX_4d6552943f5a4.setAdUnitSlotId("474222","displayAd");

function getNewAd() {
	console.log('getNewAd()');
	OX_4d6552943f5a4.setAdUnitSlotId("474222","displayAd");
	OX_4d6552943f5a4.load();
}

function deleteArea() {
	document.getElementById('displayAdContainer').innerHTML='<div id="displayAd"></div>';
}
