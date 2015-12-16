define(function (require) {

	var Ractive = require("ractive");
	var home = require("app/views/home/home");
	var basic = require("app/views/basics/controller/basic");
	var binding = require("app/views/basics/binding/binding");
	var events = require("app/views/basics/events/events");
	var globalEvents = require("app/views/lifecycle/global-events/global-events");
	var nav = require("app/views/nav/nav");
	var navTarget = require("app/views/nav/nav-target");
	var navTargetParams = require("app/views/nav/nav-target-params");
	var basicForm = require("app/views/forms/basic/basic-form");
	var validatingForm = require("app/views/forms/validate/validating-form");	
	var notFound = require("app/views/notfound/notFound");

	function routes() {

		var homeRoute = {path: '/home',
			ctrl: home
		};

		var routes = {
			home: homeRoute,
			nav: {path: '/nav', ctrl: nav},
			basic: {path: '/basic', ctrl: basic},
			binding: {path: '/binding', ctrl: binding},
			events: {path: '/events', ctrl: events},
			globalEvents: {path: '/global-events', ctrl: globalEvents},
			navTarget: {path: '/nav-target', ctrl: navTarget},
			navTargetParams: {path: '/nav-target-params/:id?name', ctrl: navTargetParams},
			basicForm: {path: '/basic-form', ctrl: basicForm},
			validatingForm: {path: '/form-validation', ctrl: validatingForm},
			notFound: {path: '*', ctrl: notFound}
		};

		Ractive.defaults.debug = true;
		
		return routes;

	}
	return routes();
});