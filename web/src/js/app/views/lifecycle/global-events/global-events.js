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

		$(kudu).on("viewBeforeInit", viewBeforeInit);
		$(kudu).on("viewInit", viewInit);
		$(kudu).on("viewRender", viewRender);
		$(kudu).on("viewComplete", viewComplete);
		$(kudu).on("viewBeforeUnrender", viewBeforeUnrender);
		$(kudu).on("viewUnrender", viewUnrender);
		$(kudu).on("viewFail", viewFail);
	}

	function removeGlobalEventListeners() {
		$(kudu).off("viewBeforeInit", viewBeforeInit);
		$(kudu).off("viewInit", viewInit);
		$(kudu).off("viewRender", viewRender);
		$(kudu).off("viewComplete", viewComplete);
		$(kudu).off("viewBeforeUnrender", viewBeforeUnrender);
		$(kudu).off("viewUnrender", viewUnrender);
		$(kudu).off("viewFail", viewFail);
	}

	function viewBeforeUnrender(e, options) {
		prettyLog("viewBeforeUnrender", options, options.oldCtrl);
	}

	function viewBeforeInit(e, options) {
		prettyLog("viewBeforeInit", options, options.newCtrl);
	}

	function viewInit(e, options) {
		prettyLog("viewInit", options, options.newCtrl);
	}

	function viewUnrender(e, options) {
		prettyLog("viewUnrender", options, options.oldCtrl);
	}

	function viewRender(e, options) {
		prettyLog("viewRender", options,options.newCtrl );
	}

	function viewComplete(e, options) {
		prettyLog("viewComplete", options, options.newCtrl);
	}

	function viewFail(e, options) {
		prettyLog("viewFail", options, options.newCtrl);
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
