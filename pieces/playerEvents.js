function showNextVideo() {
	console.log('showNextVideo()');
	//console.log(this);
	deleteArea();
	if(parseInt(t3.currentIndex) === t3.playlist.length - 1) {
		t3.currentIndex = 0;
		this.load([{file:t3.playlist[0].src[0]}]);
	} else {
		t3.currentIndex++;
		this.load([{file:t3.playlist[t3.currentIndex].src[0]}]);
	}
}