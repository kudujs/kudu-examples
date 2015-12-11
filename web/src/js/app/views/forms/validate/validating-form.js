define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var kudu = require("parsley");
	var template = require("rvc!./validating-form");

	function ValidatingForm() {

		var that = {};

		var formValidationFeedback = false;

		var parsley;

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		that.onRender = function (options) {
			parsley = $('form').parsley();
			parsley.on('form:validated', function (field) {
				formValidationFeedback = true;
				showFormValidationFeedback();
			});

			parsley.on('field:validated', function (field) {
				console.log("field:validated triggered");

				if (!formValidationFeedback) {
					return;
				}
				showFormValidationFeedback();

				console.log("<MO");
				setTimeout(function () {


				});

			})

					.on('form:success', function (form) {
						var value = $("#exampleInputEmail1").val();
						return false; // Don't submit form for this demo
					});
		};

		function showFormValidationFeedback() {
			setTimeout(function() {
			var ok = $('.parsley-error').length === 0;
			console.log("show message? " + ok)
			$('.bs-callout-info').toggleClass('hidden', !ok);
			$('.bs-callout-warning').toggleClass('hidden', ok);
				
			})
		}

		function createView() {

			var view = new template({
				submit: function () {
					this.event.original.preventDefault();
					var res = parsley.validate();
					var ok = $('.parsley-error').length === 0;
					//console.log("OK ", res, ok);
					//$('.bs-callout-info').toggleClass('hidden', !ok);
					//$('.bs-callout-warning').toggleClass('hidden', ok);

				}
			});
			return view;
		}

		return that;
	}
	return ValidatingForm;
});
