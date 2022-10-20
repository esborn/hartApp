var gulp = require("gulp");
var concat = require("gulp-concat-util");
var compress = require("gulp-compress");
var gulpSettings = require("./gulpSettings.json");

var spLayoutHelpers = require("../src/assets/spLayoutHelpers/_index");

gulp.task("js-shims", function () {

    var shimsList = gulpSettings.isSPEnv ? spLayoutHelpers : [];

    return gulp.src(shimsList)
        .pipe(concat("shims.js", {sep: ";"}))
        .pipe(compress.minifyJs())
        .pipe(gulp.dest(gulpSettings.distFolder + "/js"));
});