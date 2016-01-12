define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var template = require("rvc!./methods");

	function events() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		function createView() {

			var view = new template({
				
				data: {
					items: [
						{name: 'Item 1'},
						{name: 'Item 2'},
						{name: 'Item 3'},
					]
				},

				test: function () {
					console.log("test() invoked!");
					return false; //returning false cancels the original event, the link that was clicked
				},

				testThis: function () {
					// 'this' refers to the Ractive instance
					console.log("testThis invoked!");
					console.log("	[ractive instance]:", this);

					// 'this.event' refers to the Ractive event, see: http://docs.ractivejs.org/latest/proxy-events
					console.log("	[ractive event]:", this.event);

					// 'this.event.original' refers to the DOM event, the link that was clicked
					console.log("	[DOM 'click' event]:", this.event.original);
					return false;
				},

				testArgs: function (ref, event, str, bool, obj) {
					console.log("arg this", ref);
					console.log("arg event", event);
					console.log("arg str", str);
					console.log("arg bool", bool);
					console.log("arg object", obj);
					return false;
				}
			});
			return view;
		}

		return that;
	}
	return events;
});
