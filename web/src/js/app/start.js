define(function (require) {
	var $ = require("jquery");
	var ractive = require("ractive");
	require("bootstrap");
	var routes = require("app/config/routes");
	var menu = require("./menu/menu");

	menu.init({target: "#menu"});


	var kudu = require("kudu");

	kudu.router().addRoute({path: "/moo", moduleId: "one"});

	kudu.init({
		target: "#container",
		routes: routes,
		defaultRoute: routes.home
				//unknownRouteResolver: null,
				//fx: true
	});

	$(kudu).one("viewRender", setupInitialActiveMenu);

	function setupInitialActiveMenu(e, options) {
		// options.initialRoute;
		var route = kudu.getActiveRoute();
		var path = route.path;
		path = path.slice(1);
		var $item = $(".navbar [href='#" + path + "']");
		$item.closest('li').addClass("active")

	}
});