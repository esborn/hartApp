var gulp = require("gulp");
var runSequence = require("run-sequence");
var requireDir = require("require-dir");
var gulpSettings = require("./gulp-config/gulpSettings.json")

requireDir("./gulp-config");

gulp.task("default", ["runDevelopment"]);

gulp.task("prod", ["runProduction"]);

gulp.task("runDevelopment", function () {
    requireDir("./gulp-config/dev");
    if (!gulpSettings.isSPEnv) {
        runSequence("clean", "copy-app-dev", "copy-assets", "js-core-dev", "js-shims", "less-core", "webserver", "watch");
    } else {
        runSequence("clean", "copy-app-dev", "copy-assets", "js-core-dev", "js-shims", "less-core", "upload-js-dev");
    }
});

gulp.task("runProduction", function () {
    runSequence("clean", "copy-app-prod", "copy-assets", "js-core-prod", "js-shims", "less-core");
});