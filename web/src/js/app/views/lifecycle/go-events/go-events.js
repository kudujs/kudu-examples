define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var template = require("rvc!./go-events");
	var stringUtils = require("app/utils/stringUtils");
	
	function goEvents() {

		var that = {};
		that.onInit = function (options) {
			var view = createView();
			return view;
		};
		return that;
	}

	function createView() {

		var view = new template({
			reloadView: function () {

				kudu.go({ctrl: goEvents,
					
					viewRemove: function (options) {
						prettyLog("viewRemove", options, options.ctrl);
					},
					
					viewBeforeUnrender: function (options) {
						prettyLog("viewBeforeUnrender", options, options.ctrl);
					},
					
					
					viewBeforeInit: function (options) {
						prettyLog("viewBeforeInit", options, options.ctrl);
					},
					
					viewInit: function (options) {
						prettyLog("viewInit", options, options.ctrl);
					},
					
					viewUnrender: function (options) {
						prettyLog("viewUnrender", options, options.ctrl);
					},
					
					viewRender: function (options) {
						prettyLog("viewRender", options,options.ctrl );
					},
					
					viewComplete: function (options) {
						prettyLog("viewComplete", options, options.ctrl);
					},

					viewFail: function (options) {
						prettyLog("viewFail", options, options.ctrl);
					}

				});
			}
		});
		return view;
	}
	
		
	function prettyLog(event, options, ctrl) {
		console.log("Kudu.go event triggered [" + event + ": %c" + getPrettyCtrlName(ctrl) + "]", "color:red", options);
	}

	function getPrettyCtrlName(ctrl) {
		var id = ctrl.id;
		var namePath = id.split("/").pop();
		var name = stringUtils.dashToCamel(namePath);
		name = stringUtils.capitalize(name);
		return name;
	}

	return goEvents;
});
