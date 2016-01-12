define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var basic = require("../basics/controller/basic");
	var template = require("rvc!./home");

	function home() {

		var that = {};

		that.onInit = function (options) {
			var view = createView();
			return view;
		};
		
		that.onRender = function(options) {
			setTimeout(function() {
				$('#home-demo').removeClass('invisible').addClass("rollIn");
			}, 500);
			 $('#home-welcome').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (){
     //$('#home-demo').removeClass('invisible').addClass("zoomInUp");
     //$('#').addClass('animated infinite shake');
    } );
		};

		function createView() {

			var view = new template({});
			view.start = function() {
				kudu.go({ctrl: basic});
			};
			return view;
		}

		return that;
	}
	return home;
});
