define(function (require) {

	requirejs.onResourceLoad = function (context, map, depArray) {
		var obj = context.defined[map.name];

		if (obj) {
			if (obj.prototype) {
				setId(obj.prototype, map.id);
				setId(obj, map.id);
			} else {
				setId(obj, map.id);
			}
		}
	};

	function setId(obj, id) {
		// Create an ID property which isn't writable or iteratable through for in loops.
		if (!obj.id) {
			Object.defineProperty(obj, "id", {
				enumerable: false,
				writable: false,
				value: id
			});
		}
	}
});