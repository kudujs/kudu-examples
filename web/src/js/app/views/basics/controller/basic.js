define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var fade = require("fade");
	var template = require("rvc!./basic");

	function basic() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		function createView() {

			var view = new template({
				loadView: function () {
					kudu.go({ctrl: basic});
				},
				transitions: {
			 fade: fade
	 }
			});
			return view;
		}

		return that;
	}
	return basic;
});
