define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var template = require("rvc!./global-events");
	var stringUtils = require("app/utils/stringUtils");

	function globalEvents() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		return that;
	}

	function createView() {

		var view = new template({
			addListeners: function () {
				addGlobalEventListeners();

			},
			reloadView: function () {
				kudu.go({ctrl: globalEvents});

			},
			removeListeners: function () {
				removeGlobalEventListeners();
			}
		});
		return view;
	}

	function addGlobalEventListeners() {
		// Since this is global event listeners, we guard against adding the listeners more than once, so first we remove the listeners
		//  in case they have already been added
		removeGlobalEventListeners();

		$(kudu.lc).on("beforeInit", beforeInit);
		$(kudu.lc).on("init", init);
		$(kudu.lc).on("render", render);
		$(kudu.lc).on("complete", complete);
		$(kudu.lc).on("remove", remove);
		$(kudu.lc).on("beforeUnrender", beforeUnrender);
		$(kudu.lc).on("unrender", unrender);
		$(kudu.lc).on("fail", fail);
	}

	function removeGlobalEventListeners() {
		$(kudu.lc).off("remove", remove);
		$(kudu.lc).off("beforeInit", beforeInit);
		$(kudu.lc).off("init", init);
		$(kudu.lc).off("render", render);
		$(kudu.lc).off("complete", complete);
		$(kudu.lc).off("remove", remove);
		$(kudu.lc).off("beforeUnrender", beforeUnrender);
		$(kudu.lc).off("unrender", unrender);
		$(kudu.lc).off("fail", fail);
	}
	
	function remove(e, options) {
		prettyLog("remove", options, options.ctrl);
	}

	function beforeUnrender(e, options) {
		prettyLog("beforeUnrender", options, options.ctrl);
	}

	function beforeInit(e, options) {
		prettyLog("beforeInit", options, options.ctrl);
	}

	function init(e, options) {
		prettyLog("init", options, options.ctrl);
	}

	function unrender(e, options) {
		prettyLog("unrender", options, options.ctrl);
	}

	function render(e, options) {
		prettyLog("render", options,options.ctrl );
	}

	function complete(e, options) {
		prettyLog("complete", options, options.ctrl);
	}

	function fail(e, options) {
		prettyLog("fail", options, options.ctrl);
	}
	
	function prettyLog(event, options, ctrl) {
		console.log("Global event triggered [" + event + ": %c" + getPrettyCtrlName(ctrl) + "]", "color:red", options);
	}

	function getPrettyCtrlName(ctrl) {
		var id = ctrl.id;
		var namePath = id.split("/").pop();
		var name = stringUtils.dashToCamel(namePath);
		name = stringUtils.capitalize(name);
		return name;
	}

	return globalEvents;
});
