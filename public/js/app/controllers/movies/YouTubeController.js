// app.controller('YouTubeController', []);
// app.constant('YT_event', {
// 	STOP:            0, 
// 	PLAY:            1,
// 	PAUSE:           2
// });

// app.run(function () {
//   var tag = document.createElement('script');
//   tag.src = "https://www.youtube.com/iframe_api";
//   var firstScriptTag = document.getElementsByTagName('script')[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// });


app.controller('YouTubeController', function($scope, YT_event) {

	var ctrl = this;

	var youtube = {
		player: null,
		playerId: "Youtube-Player",
		videoId: null
	};

	//initial settings
	$scope.playerStatus = "undefined"

	$scope.YT_event = YT_event;

	$scope.yt_target = null;

	$scope.yt_ready = false;

	ctrl.modal = {
		status: 'undefined',
		player: false
	};
	
	ctrl.getPlayer = function() {
		return this.modal.player;
	};
	ctrl.createPlayer = function($yt_target) { 
		//console.log('createPlayer', youtube);
		var player = new YT.Player(youtube.playerId, {
			height: '100%',
			width: '100%',
			videoId: youtube.videoId,
			playerVars: {
				autoplay: 0,
				html5: 1,
				theme: "light",
				modesbranding: 0,
				color: "white",
				iv_load_policy: 3,
				showinfo: 1,
				controls: 1
			}
		});
		return player;
	}

	$scope.addModal = function(modal) {
		ctrl.modal = modal;
		ctrl.modal.status = 'closed'
	}

	$scope.play = function(v) {
		//console.log(youtube);
		ctrl.modal.modal('show');
		if(v == youtube.yt_target)
			youtube.player.playVideo();
		else {
			youtube.player.loadVideoById(v);
			youtube.yt_target = v;
		}
		ctrl.modal.status = 'opened'
	}

	$scope.closeModal = function() {
		//console.log('closing');
		$scope.stopVideo();
		ctrl.modal.modal('hide');

	}
	$scope.stopVideo = function() {
		//console.log('stop videi');
		youtube.player.seekTo(0);
		youtube.player.stopVideo();
		$scope.yt_ready = false;

	}

	$scope.initPlayer = function($videoId) {
		youtube.player = ctrl.createPlayer();
		$scope.yt_ready = true;
	}

});


