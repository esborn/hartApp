var gulp = require("gulp");
var del = require("del");
var gulpSettings = require("./gulpSettings.json");

gulp.task("clean", function () {
	return del([gulpSettings.distFolder], {force : true});
});