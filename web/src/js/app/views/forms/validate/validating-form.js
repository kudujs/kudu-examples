define( function ( require ) {
	var $ = require( "jquery" );
	var kudu = require( "kudu" );
	var fade = require( "fade" );
	var messagesFn = require( "app/views/comp/messages/messages" );
	require( 'app/views/comp/messages/ractive-transitions-velocity' );
	var velocity = require( "app/views/comp/messages/velocity" );
	var parsley = require( "parsley" );
	var template = require( "rvc!./validating-form" );

	function ValidatingForm() {

		var that = { };

		var parsley;

		var view;
		
		var messages;

		that.onInit = function ( options ) {
			view = createView();
			
			messages = messagesFn(view);
			
			return view;
		};

		that.onRender = function ( options ) {
			parsley = $( 'form' ).parsley( {
				// This comment shows how to use bootstrap's error highlighting

				successClass: "has-success",
				errorClass: "has-error",
				classHandler: function ( field ) {
					return field.$element.closest( ".form-group" );
				},
				errorsWrapper: "<span class='help-block parsley-errors-list' style='display:none'></span>",
				errorTemplate: "<span></span>"

			} );
			parsley.on( 'form:validated', function ( form ) {

				// If you want all fields automatically tracked for errors after form submission, uncomment line below
				//setFieldsInvalid(form);
				showFormValidationFeedback( form );
			} );

			var queue = [ ];

			parsley.on( 'field:error', function ( field ) {
				if ( field.$element.attr( 'name' ) != 'name' ) {
					return;
				}
				var errors = field.getErrorsMessages();
				//console.log( "error", errors );
				messages.addMessages(errors);
				//queue.unshift( errors );

				//process( queue );

			} );

			parsley.on( 'field:success', function ( field ) {
				if ( field.$element.attr( 'name' ) != 'name' ) {
					return;
				}

				var errors = field.getErrorsMessages();
				messages.addMessages(errors);

			} );

			parsley.on( 'field:validated', function ( field ) {
				showFormValidationFeedback( field.parent );
			} );
		};

		function setFieldsInvalid( form ) {
			for ( var n = 0; n < form.fields.length; n ++ ) {
				var field = form.fields[n];
				ParsleyUI.manageFailingFieldTrigger( field );

			}
		}

		function showFormValidationFeedback( form ) {
			var ok = form.isValid();
			$( '.bs-callout-info' ).toggleClass( 'hidden', ! ok );
			$( '.bs-callout-warning' ).toggleClass( 'hidden', ok );
		}

		function createView() {

			var view = new template( {
				data: { errors: [ ] },
				transitions: {
					fade: fade,
				},
				submit: function () {
					var valid = parsley.validate();
					return false;
				},
				reset: function () {
					$( '.bs-callout-info' ).addClass( 'hidden' );
					$( '.bs-callout-warning' ).addClass( 'hidden' );
				}
			} );
			return view;
		}

		return that;
	}
	return ValidatingForm;
} );
