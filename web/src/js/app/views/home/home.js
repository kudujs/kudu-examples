define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var basic = require("../basics/controller/basic");
	var template = require("rvc!./home");

	function home() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		function createView() {

			var view = new template({});
			view.start = function() {
				kudu.go({ctrl: basic});
			};
			return view;
		}

		return that;
	}
	return home;
});
