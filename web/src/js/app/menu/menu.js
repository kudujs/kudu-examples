define(function (require) {

	var navTemplate = require("rvc!./menu");
	var routes = require("app/config/routes");
	var kudu = require("kudu");

	var $ = require("jquery");

	function menu() {

		var that = {};

		that.init = function (options) {

			new navTemplate({
				el: options.target,
				goto: function (routeName) {
					// Retrieve the route from routes
					var route = routes[routeName];

					// Navigate to the route specified
					kudu.go({ctrl: route.ctrl});

					// Cancel the click event by returning false, otherwise the link function would execute ie. follow the link href
					return false;
				}
			});
			
			// Add highlight to menu
			$(".nav a").on("click", function () {
				
				// If we click on dropdown do not change to active
				var $el = $(this);				
				if ($el.parent().hasClass("dropdown")) {
					return;
				}
				$(".nav").find(".active").removeClass("active");
				$(this).parent().addClass("active");
				$('.active').closest('li.dropdown').addClass('active');
			});
		};

		return that;
	}
	return menu();
});
