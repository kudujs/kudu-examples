define(function (require) {
    var $ = require("jquery");
    var kudu = require("kudu");
    var template = require("rvc!./ajax-events");

    function ajaxEvents() {

        var that = {};

        that.onInit = function (options) {

            var promise = new Promise(function (resolve, reject) {

                // We load the json data through an Ajax request
                var xhr = $.getJSON("data/hello.json?delay=2000");

                registerToEvents();

                options.ajaxTracker.add(xhr);


                xhr.then(function (data) {

                    // Here we have the data and pass it to the createView method to render
                    var view = createView(data);

                    // Everything is good, so we resolve the promise, passing in the view
                    resolve(view);
                }, function () {
                    // Oops, something went wrong, so we reject the promise
                    reject("Could not load data for AjaxEvents");
                });
            });

            return promise;
        };

        function createView(data) {

            var view = new template();

            // Convert the JSON data objectr to a string representation
            var json = JSON.stringify(data);

            // Set the json data object to render
            view.set("response", json);

            view.reload = function () {
                kudu.go({ctrl: ajaxEvents});
            };
            return view;
        }

        function registerToEvents() {
            kudu.on("global.ajax.start", function (options) {
                console.log("global.ajax.start", options);
            });
            kudu.on("ajax.start", function (options) {
                console.log("ajax.start", options);
            });
            kudu.on("ajax.success", function (options) {
                console.log("ajax.success", options);
            });
            kudu.on("ajax.error", function (options) {
                console.log("ajax.error", options);
            });
            kudu.on("ajax.complete", function (options) {
                console.log("ajax.complete", options);
            });
            kudu.on("ajax.stop", function (options) {
                console.log("ajax.stop", options);
            });
            kudu.on("global.ajax.stop", function (options) {
                console.log("global.ajax.stop", options);
            });
        }

        return that;
    }
    return ajaxEvents;
});
