/* modules: 
 * https://www.npmjs.com/package/requirejs
 */

var requirejs = require('requirejs');

var promise = new Promise(function (resolve, reject) {

	module.exports = function (rConfig, appConfig) {
		
		// Set the r.js build version to our app version
		rConfig.version = appConfig.version;

		requirejs.optimize(rConfig, function (buildResponse) {

			resolve(buildResponse);

		}, function (err) {
			console.log(err);
			reject(err);
			//optimization err callback
		});
		
		return promise;
	}
});