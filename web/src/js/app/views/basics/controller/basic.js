define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
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
				}
			});
			return view;
		}

		return that;
	}
	return basic;
});
