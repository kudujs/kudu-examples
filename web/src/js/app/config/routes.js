define(function (require) {

	var Ractive = require("ractive");
	var home = require("app/views/home/home");
	var customer = require("app/views/customer/customer");
	var nav = require("app/views/nav/nav");
	var navTarget = require("app/views/nav/nav-target");
	var navTargetParams = require("app/views/nav/nav-target-params");
	var notFound = require("app/views/notfound/notFound");

	function routes() {

		var homeRoute = {path: '/home',
			ctrl: home
		};

		var routes = {
			home: homeRoute,
			customer: {path: '/customer', ctrl: customer},
			nav: {path: '/nav/:id?name', ctrl: nav},
			navTarget: {path: '/nav-target', ctrl: navTarget},
			navTargetParams: {path: '/nav-target-params/:id?name', ctrl: navTargetParams},
			notFound: {path: '*', ctrl: notFound}
		};

		Ractive.defaults.debug = true;
		
		return routes;

	}
	return routes();
});