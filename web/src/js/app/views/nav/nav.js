define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
		var template = require("rvc!./nav");
	
	function nav() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		function createView() {
			var routes;
			require(["app/config/routes"], function(arg) {
				routes = arg;
			});

			var view = new template({
				goto: function (routeName, params) {
					// Retrieve the route from routes
					var route = routes[routeName];

					// Navigate to the route specified
					kudu.go({ctrl: route.ctrl, routeParams: params, force: true, updateUrl: false});

					// Cancel the click event by returning false, otherwise the link function would execute ie. follow the link href
					return false;
				}
			});
			return view;
		}

		return that;
	}
	return nav;
});
