define(function (require) {
	var $ = require("jquery");
	var kudu = require("kudu");
	var parsley = require("parsley");
	var template = require("rvc!./validating-form");

	function ValidatingForm() {

		var that = {};

		//var formValidationFeedback = false;

		var parsley;

		that.onInit = function (options) {
			var view = createView();
			return view;
		};

		that.onRender = function (options) {
			parsley = $('form').parsley({
				/*
			}
				successClass: "has-success",
				errorClass: "has-error",
				classHandler: function (field) {
					return field.$element.closest(".form-group");
				},
				errorsWrapper: "<span class='help-block parsley-errors-list'></span>",
				errorTemplate: "<span></span>"
*/
			});
			parsley.on('form:validated', function (form) {

				//formValidationFeedback = true;
				//setFieldsInvalid(form);
				showFormValidationFeedback(form);
			});

			parsley.on('field:validated', function (field) {
				console.log("VALID", field.isValid());

//				if (!formValidationFeedback) {
//					return;
//				}
				showFormValidationFeedback(field.parent);
			});

			/*
			 .on('form:submit', function (form) {
			 return false; // Don't submit form for this demo
			 });*/
		};

		function setFieldsInvalid(form) {

			for (var n = 0; n < form.fields.length; n++) {
				//var fieldui = form.fields[n]._ui;
				var field = form.fields[n];
				ParsleyUI.manageFailingFieldTrigger(field);

			}
		}

		function showFormValidationFeedback(form) {
			var ok = form.isValid();
			$('.bs-callout-info').toggleClass('hidden', !ok);
			$('.bs-callout-warning').toggleClass('hidden', ok);
		}

		function createView() {

			var view = new template({
				submit: function () {
					this.event.original.preventDefault();
					var valid = parsley.validate();
					console.log("Form VALID", valid)
					//var ok = $('.parsley-error').length === 0;
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
