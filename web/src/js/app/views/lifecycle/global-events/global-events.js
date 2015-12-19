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

		$(kudu).on("beforeInit", beforeInit);
		$(kudu).on("init", init);
		$(kudu).on("render", render);
		$(kudu).on("complete", complete);
		$(kudu).on("remove", remove);
		$(kudu).on("beforeUnrender", beforeUnrender);
		$(kudu).on("unrender", unrender);
		$(kudu).on("fail", fail);
	}

	function removeGlobalEventListeners() {
		$(kudu).off("remove", remove);
		$(kudu).off("beforeInit", beforeInit);
		$(kudu).off("init", init);
		$(kudu).off("render", render);
		$(kudu).off("complete", complete);
		$(kudu).off("remove", remove);
		$(kudu).off("beforeUnrender", beforeUnrender);
		$(kudu).off("unrender", unrender);
		$(kudu).off("fail", fail);
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
