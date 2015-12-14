define(function (require) {
	var $ = require("jquery");
	var prism = require("prism");
	var template = require("rvc!./side-panel");
	var kudu = require("kudu");
	var panel;

	function sidePanel(options) {
		$("body").off("click", handleBodyClick);
		$("body").on("click", handleBodyClick);

		options.close = function () {
			if ($(this.event.original.target).is('.cd-panel') || $(this.event.original.target).is('.cd-panel-close')) {
				this.set("visible", false);
			}
			return false;
		};

		panel = new template(options);

		// Public 
		panel.show = function (options) {
			options = options || {};
			var path = options.path || getUrlPath();
			var ext = options.ext || "";
			panel.set("visible", true);
			//console.log(sidePanel.id);
			//"/js/ + path + ext
			panel.set("code", path + "." + ext);
			panel.set("title", path + "." + ext);
			prism.fileHighlight();
			prism.highlightElement($('.cd-panel-content')[0]);
		};

		return panel;
	}

	function getUrlPath() {
		var route = kudu.getActiveRoute();
		var id = route.ctrl.id;
		return "js/" + id;
	}

	function camelToDash(str) {
		return str.replace(/\W+/g, '-')
				.replace(/([a-z\d])([A-Z])/g, '$1-$2');
	}

	function dashToCamel(str) {
		return str.replace(/\W+(.)/g, function (x, chr) {
			return chr.toUpperCase();
		})
	}

// Private 
	function handleBodyClick(e) {
		if (panel.get("visible") === true) {

			if ($(e.target).is('a')) {
				panel.set("visible", false);

				//$(".cd-panel-container").css("transition-delay", "0s");
				//$(".cd-panel-header").css("transition-property", "none");
				//$(".cd-panel-container").css("transform", "none");
				//$(".cd-panel-container").css("transition-property", "none");
				$(".cd-panel").css("transitionProperty", "none");
				setTimeout(function () {
					$(".cd-panel").css("transitionProperty", "all");
				});
				//$(".cd-panel").css("transitionProperty", "background 0.3s 0s");

				//$(".cd-panel").css("transform", "none");



				/*
				 e.preventDefault();
				 e.stopPropagation();
				 setTimeout(function () {
				 $(e.target)[0].click();
				 }, 600);*/
			}
		}
	}
	;
	return sidePanel;
});
