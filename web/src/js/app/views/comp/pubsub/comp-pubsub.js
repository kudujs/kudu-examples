define(function (require) {
    var $ = require("jquery");
    var ractive = require("ractive");
    var kudu = require("kudu");
    var template = require("rvc!./comp-pubsub");
    var gridComponent = require("./grid");

    function compPubSub() {

        var that = {};

        that.onInit = function (options) {

            var view = createView();
            return view;
        };

        function createView(data) {

            var view = new template({
                components: {
                    grid: gridComponent
                },
                handleAddRow: function(row) {
                    // handleAddRow is called from the template as: on-addRow="handleAddRow($1)
                    // The $1 is a mapping to the first argument that the grid component addRow event published
                    // Other arguments would be mapped as $2, $3 or all with (...arguments)
                    console.log("[parent] handleAddRow:", row);
                }
            });
            
            // Subscribe to the removeRow event fired by the Grid component, note we use the 'grid:' namespace to
            // listen to the removeRow event of the grid component
            view.on("grid.removeRow", function(row) {
                console.log("[parent] grid.removeRow:", row);
            });
            
            // We can also subsribe to all removeRow events from all components using the '*.' notation.
            view.on("*.removeRow", function(row) {
                console.log("[parent] *.removeRow:", row);
            });
            

            return view;
        }

        return that;
    }
    return compPubSub;
});
