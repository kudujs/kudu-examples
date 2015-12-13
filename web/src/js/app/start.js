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
		var $item = $(".navbar [href='#" + path +"']");
		$item.closest('li').addClass("active")
		
} 


	/*  Below we are manually navigating the menus instead of using the href tag. The advantage of this is clicking on the link will force
	 * a page reload, while using the href tag on the second click won't, since the hash value does not change. */
	/*
	 $("#menu-home").on('click', function (e) {
	 e.preventDefault();
	 kudu.go({ctrl: home});
	 });*/

});