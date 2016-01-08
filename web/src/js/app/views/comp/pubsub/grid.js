define(function (require) {
    var $ = require("jquery");
    var ractive = require("ractive");
    var template = require("rvc!./grid");

    function grid() {

        var data = {
            rows: [
                {name: "Bob", age: 20, id: 11},
                {name: "Steve", age: 30, id: 12},
                {name: "James", age: 40, id: 13},
                {name: "Henry", age: 50, id: 14}
            ]
        };

        var component = template.extend({

            add: function (row) {
                console.log("[component] add:", row);

                this.push("rows", row);

                console.log("[component] firing 'addRow' event for subscribers");

                // Fire event for listeners to act upon
                this.fire("addRow", row);
            },
           
            remove: function (id, index) {
                var row = data.rows[index];
                console.log("[component] remove:", row);

                this.splice("rows", index, 1);

                console.log("[component] firing 'removeRow' event for subscribers");

                // Fire event for listeners to act upon
                this.fire("removeRow", row);
            },

            data: function () {
                return data;
            }
        });

        return component;
    }
    return grid();
});
