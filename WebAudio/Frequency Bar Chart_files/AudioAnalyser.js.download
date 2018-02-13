define(['jquery', 'jsFrames.min'], function ($, jsFrames) {
	// Future-proofing...
	var context;
	if (typeof AudioContext !== "undefined") {
		context = new AudioContext();
	} else if (typeof webkitAudioContext !== "undefined") {
		context = new webkitAudioContext();
	}

	var pubsub = $({});
	var updateEventName = "analyser.update";
	var analyser;

	var player;
	var streamingSource;
	var localSource;

	return {
	    supported: context !== undefined,

	    initialise: function (mediaPlayer, fftSize, smoothingTimeConstant) {
	    	player = mediaPlayer;
		    
	        // Create the analyser
	        analyser = context.createAnalyser();

	        if (fftSize !== undefined) {
	            analyser.fftSize = fftSize;
	        }

	        if (smoothingTimeConstant !== undefined) {
	            analyser.smoothingTimeConstant = smoothingTimeConstant;
	        }

	        var updateEvent = jQuery.Event(updateEventName);
	        updateEvent.frequencyData = new Uint8Array(analyser.frequencyBinCount);

	        jsFrames.registerAnimation(function () {
	            // Get the frequency data and trigger an update
	            analyser.getByteFrequencyData(updateEvent.frequencyData);
	            pubsub.trigger(updateEvent);
	        });

	        jsFrames.start();
	    },

	    fromMediaPlayer: function () {
	        if (localSource) {
	            localSource.disconnect();
	        }

	    	// Hook up the audio routing...
	    	// player -> analyser -> speakers
	        function hookUpAudioRouting() {
	        	streamingSource = streamingSource || context.createMediaElementSource(player[0]);
	        	streamingSource.connect(analyser);
	        	analyser.connect(context.destination);
	        }

			// Do this after the player is ready to play - https://code.google.com/p/chromium/issues/detail?id=112368#c4
			if (player[0].readyState > 2) {
				// We may have missed the canplay event already
				hookUpAudioRouting();
			} else {
				player.bind('canplay', function () {
					hookUpAudioRouting();
				});
			}
		},


		fromLocalSource: function () {
		    if (streamingSource) {
		    	streamingSource.disconnect();
			    analyser.disconnect();
		    }

			navigator.webkitGetUserMedia({ audio: true }, function(stream) {
				localSource = context.createMediaStreamSource(stream);
				localSource.connect(analyser);
			}, function(err) {
				console.log("The following error occured: " + err);
			});
		},

		onAnalyserUpdate: function (update) {
		    pubsub.bind(updateEventName, update);
		},

		frequencyBinCount: function () {
		    return analyser.frequencyBinCount;
		},
	    
		displayFps: function(element) {
			jsFrames.onFpsUpdate(function (fps) {
				element.html(fps);
			});
		}
	};
});