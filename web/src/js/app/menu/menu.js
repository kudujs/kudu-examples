define(function (require) {
	
	var kudu = require("kudu");
	var pace = require("pace");
	var menuTemplate = require("rvc!./menu");
	var sidePanel = require("app/panel/side-panel/sidePanel");
	var ctrlEvents = require("app/views/lifecycle/ctrl-events/ctrl-events");
	var basicTransition = require("app/views/transition/basic/basic-transition");
	var sidePanelObj;

	var $ = require("jquery");

	function menu() {

		var that = {};

		that.init = function (options) {

			// Create menu view instance
			new menuTemplate({
				
				el: options.target,
			
				gotoCtrlEvents: function() {
					kudu.go({ctrl: ctrlEvents});
					this.event.original.preventDefault();
				},
				
				showJavascript: function (routeName) {
					sidePanelObj.show({
						ext: "js"

					});
					// Cancel the click event by returning false, otherwise the link function would execute ie. follow the link href
					return false;
				},

				showHtml: function (routeName) {
					sidePanelObj.show({
						ext: "html"

					});
					// Cancel the click event by returning false, otherwise the link function would execute ie. follow the link href
					return false;
				}
			});

			// Create sidePanel instance
			sidePanelObj = sidePanel({
				el: '#side-panel'
			});

			// Add highlight to menu
			highlightActiveMenu();
			
			pace.stop();
		};

		function highlightActiveMenu() {
			$(".nav a").on("click", function () {
				var $el = $(this);

				var navId = $el.attr("id");

				// Don't highlight showJavascript and showHtml menu items since they trigger a slide panel, not an actual new view
				if (navId === "showJs" || navId === "showHtml") {
					return;
				}

				// If we click on dropdown do not change to active
				if ($el.parent().hasClass("dropdown")) {
					return;
				}
				$(".nav").find(".active").removeClass("active");
				$(this).parent().addClass("active");
				$('.active').closest('li.dropdown').addClass('active');
			});
		}

		return that;
	}
	return menu();
});
