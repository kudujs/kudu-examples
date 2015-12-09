define(function (require) {

	var navTemplate = require("rvc!./menu");
	var sidePanel = require("app/views/panel/sidePanel");
	var kudu = require("kudu");
	var sidePanelObj;

	var $ = require("jquery");

	function menu() {

		var that = {};

		that.init = function (options) {
			sidePanelObj = sidePanel({el: '#side-panel',
				data: {title: "Title goes here", content: "content"
				}});

			new navTemplate({
				el: options.target,
				showJavascript: function (routeName) {
					sidePanelObj.show({
						ext:"js"
						
					});
					// Cancel the click event by returning false, otherwise the link function would execute ie. follow the link href
					return false;
				},
				
				showHtml: function (routeName) {
					sidePanelObj.show({
						ext:"html"
						
					});
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
