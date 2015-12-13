define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var template = require("rvc!./basic-form");

	function basicForm() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		function createView() {

			var view = new template({
				submit: function () {
					$('.bs-callout-info').removeClass('hidden');
					return false;
				}
			});
			return view;
		}

		return that;
	}
	return basicForm;
});
