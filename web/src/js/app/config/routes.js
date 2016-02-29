define(function (require) {

	var kudu = require("kudu");
	var Ractive = require("ractive");
	var home = require("app/views/home/home");
	var basic = require("app/views/basics/controller/basic");
	var binding = require("app/views/basics/binding/binding");
	var methods = require("app/views/basics/methods/methods");
	var globalEvents = require("app/views/lifecycle/global-events/global-events");
	var controllerEvents = require("app/views/lifecycle/ctrl-events/ctrl-events");
	var goEvents = require("app/views/lifecycle/go-events/go-events");
	var nav = require("app/views/nav/nav");
	var navTarget = require("app/views/nav/nav-target");
	var navTargetParams = require("app/views/nav/nav-target-params");
	var redirect = require("app/views/nav/redirect/redirect");
	var basicForm = require("app/views/forms/basic/basic-form");
	var validatingForm = require("app/views/forms/validate/validating-form");
	var ajaxBasics = require("app/views/ajax/basic/basic-ajax");
	var ajaxTracker = require("app/views/ajax/tracker/ajaxtracker");
	var ajaxEvents = require("app/views/ajax/events/ajax-events");
	var compBasics = require("app/views/comp/basic/basic-comp");
	var compPubSub = require("app/views/comp/pubsub/comp-pubsub");
	var multiComp = require("app/views/comp/multple/multiple-comp");
	var partialBasics = require("app/views/partial/basic/basic-partial");
	var transitionBasics = require("app/views/transition/basic/basic-transition");
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
			events: {path: '/methods', ctrl: methods},
			globalEvents: {path: '/global-events', ctrl: globalEvents},
			controllerEvents: {path: '/ctrl-events', ctrl: controllerEvents},
			goEvents: {path: '/go-events', ctrl: goEvents},
			navTarget: {path: '/nav-target', ctrl: navTarget},
			navTargetParams: {path: '/nav-target-params/:id?name', ctrl: navTargetParams},
			basicForm: {path: '/basic-form', ctrl: basicForm},
			validatingForm: {path: '/form-validation', ctrl: validatingForm},
			ajaxBasics: {path: '/ajax-basics', ctrl: ajaxBasics},
			ajaxTracker: {path: '/ajax-tracker', ctrl: ajaxTracker},
			ajaxEvents: {path: '/ajax-events', ctrl: ajaxEvents},
			compBasics: {path: '/comp-basics', ctrl: compBasics},
			compPubSub: {path: '/comp-pubsub', ctrl: compPubSub},
			multiComp: {path: '/comp-multi', ctrl: multiComp},
			partialBasics: {path: '/partial-basics', ctrl: partialBasics},
			transitionBasics: {path: '/transition-basics', ctrl: transitionBasics},
			redirect: {path: '/redirect', ctrl: redirect},
			notFound: {path: '*', ctrl: notFound}
		};

		Ractive.defaults.debug = true;

		return routes;

	}
	return routes();
});