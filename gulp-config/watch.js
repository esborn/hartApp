var gulp = require("gulp");

gulp.task("watch", function() {
	gulp.watch([
		"./src/assets/img/**/*",
		"./src/assets/fonts/**/*",
		"./src/assets/i18n/**/*"
	], ["copy"]);

	gulp.watch([
		"./src/index.html"
	], ["baseTagInject"])

	gulp.watch(["./src/assets/**/*.less"], ["less-core"]);
	gulp.watch(["./src/app/**/*.less"], ["less-core"]);

	gulp.watch([
		"./src/app/**/*.html",
		"./src/app/**/*.js",
		"./src/app/**/*.json",
        "./src/app/**/*.txt",
		"./src/assets/polyfills/**/*.js"
	], ["js-core"]);
});