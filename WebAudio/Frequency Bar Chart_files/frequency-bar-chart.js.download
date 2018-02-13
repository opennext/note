define(['AudioAnalyser', 'jquery'], function (audioAnalyser, $) {
	return {
		go: function() {
			// Set up the visualisation elements
			var visualisation = $("#visualisation");
			for (var i = 0; i < audioAnalyser.frequencyBinCount() ; i++) {
				$("<div/>").css("left", i * 15 + "px")
					.appendTo(visualisation);
			}
			var bars = $("#visualisation > div");

			// Subscribe to analyser updates
			audioAnalyser.onAnalyserUpdate(function (e) {
				bars.each(function (index, bar) {
					bar.style.height = e.frequencyData[index] + 'px';
				});
			});
		}
	};
});