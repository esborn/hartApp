var gulp = require("gulp");
var connect = require("gulp-connect");
var gulpSettings = require("./gulpSettings.json");

gulp.task("webserver", function() {
	connect.server({
		port: 9000,
		root: gulpSettings.distFolder,
		fallback: gulpSettings.distFolder + "/index.html"
	});
});