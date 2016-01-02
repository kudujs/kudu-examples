define(function (require) {
	var $ = require("jquery");
	var ractive = require("ractive");
	require("bootstrap");
	var prism = require("prism");
	var routes = require("app/config/routes");
	var menu = require("./menu/menu");

	menu.init({target: "#menu"});


	var kudu = require("kudu");

	kudu.router().addRoute({path: "/moo", moduleId: "one"});

	kudu.init({
		target: "#container",
		routes: routes,
		defaultRoute: routes.home,
		fx: true
				//unknownRouteResolver: null,
	});

	kudu.once("lc.render", setupInitialActiveMenu);
	kudu.on("lc.render", function () {
		prism.highlightAll();
	});

	function setupInitialActiveMenu(options) {

		// options.initialRoute;
		var route = kudu.getActiveRoute();
		var path = route.path;
		path = path.slice(1);
		var $item = $(".navbar [href='#" + path + "']");
		$item.closest('li').addClass("active")

	}
});