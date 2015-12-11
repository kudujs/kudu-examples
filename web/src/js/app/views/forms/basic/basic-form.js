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
				addCustomer: function () {
					var e = this.event;
					e.original.preventDefault();
					kudu.go({ctrl: customer});
				}
			});
			return view;
		}

		return that;
	}
	return basicForm;
});