/* modules: 
 * https://www.npmjs.com/package/fs-extra
 * https://www.npmjs.com/package/glob
 * https://www.npmjs.com/package/node-version-assets
 */

var cli = require('./mods/cli');
var config = require('./mods/config');
var optimize = require('./mods/optimize');
var fs = require('fs-extra');
var versioning = require("node-version-assets");
var glob = require("glob");
var copyDereferenceSync = require('copy-dereference').sync;

// Read in the build config file
var rConfig = fs.readFileSync("./config/r.build.js", 'utf8');
rConfig = eval(rConfig);
var appConfig = config.get("app");

// Remove the deploy folder in case of previous builds
clean(rConfig);

optimize(rConfig, appConfig).then(function (buildResponse) {

	try {
		renameConfigToRequire(rConfig);
		deployExamples(rConfig, appConfig);
		console.log("Build completed successfully!");

	} catch (e) {
		console.error(e.stack);
	}


	/*
	 versionAssets(rConfig).then(function () {
	 console.log("Build completed successfully!");
	 });*/
});
/*
 function versionAssets(rConfig) {
 
 var version = new versioning({
 assets: [rConfig.dir + '/css/site.css', rConfig.dir + '/js/lib/require.js'],
 grepFiles: [rConfig.dir + '/index.html']
 });
 
 var promise = new Promise(function (resolve, reject) {
 
 version.run(function () {
 resolve();
 });
 });
 
 
 return promise;
 }*/

function renameConfigToRequire(rConfig) {
	var source = rConfig.dir + "js/app/config/config.js";
	var target = rConfig.dir + "js/lib/require.js";

	fs.renameSync(source, target);
	console.log(source + " renamed to " + target);
}

function clean(rConfig) {
	fs.removeSync(rConfig.dir);
	fs.removeSync("../../kudu-examples-pages/js");
	console.log("Removed previous buildpath: " + rConfig.dir);
}

function deployExamples(rConfig, appConfig) {
	fs.copySync(rConfig.dir, "../build/web", {clobber: true});
	console.log(" copied " + rConfig.dir + " to ../build/web");
	//fs.copySync(rConfig.dir, "../../kudu-examples-pages", {clobber: true});

	//fs.ensureSymlink("../../kudu/src/", "../../kudu-examples-pages/js/lib/kudulib/src" );

	try {

		// annoyingly node copy fails when it hits symlinks so we copy to temp folder first using the module copyDereference
		var tmpPages = "../../tmp-kudu-examples-pages";
		copyDereferenceSync(rConfig.appDir, tmpPages);
		fs.copySync(tmpPages, "../../kudu-examples-pages", {clobber: true});
		fs.removeSync(tmpPages);
		//fs.copySync("../../kudu/src/", "../../kudu-examples-pages/js/lib/kudulib", {clobber: true});
	} catch (err) {
		throw err;
	}
	console.log(" copied '" + rConfig.appDir + "' to '../../kudu-examples-pages'");
}

console.log("Running build in", config.environment(), "mode");