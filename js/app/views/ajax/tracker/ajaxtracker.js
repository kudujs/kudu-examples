define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var prism = require("prism");
	var template = require("rvc!./ajaxtracker");
	function ajaxTracker() {

		var that = {};
		that.onInit = function (options) {
			var view = createView(options.ajaxTracker);
			return view;
		};
		function createView(ajaxTracker) {

			var view = new template();


			// Add a load method for the template to invoke
			view.load = function () {
				this.set("response", "");
				fetchData(ajaxTracker, view);
			};
			
			view.abort = function () {
				ajaxTracker.abort();
			};
			return view;
		}

		function fetchData(ajaxTracker, view) {
			// We start the Ajax request
			var xhr = $.getJSON("data/hello.json?delay=2000");
			// We add the xhr to the AjaxTracker
			ajaxTracker.add(xhr);

			// Wait for the request to complete
			xhr.then(function (data) {

				// Convert the JSON data object to a string representation
				var json = JSON.stringify(data);
				// Set the json data object to render
				view.set("response", json);

			});
		}

		return that;
	}
	return ajaxTracker;
});
