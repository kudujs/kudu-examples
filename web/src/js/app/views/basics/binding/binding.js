define(function (require) {
	var template = require("rvc!./binding");

	function binding() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		function createView() {

			var view = new template({
				
				data: {"name": "World!"},
				
				reset: function() {
					this.set("name", "World!");
				}
			});
			return view;
		}

		return that;
	}
	return binding;
});
