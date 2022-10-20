var gulp = require("gulp");
var less = require("gulp-less");
var lessImport = require("gulp-less-import");
var concat = require("gulp-concat-util");
var compress = require('gulp-compress');
var plumber = require("gulp-plumber");
var gutil = require("gulp-util");
var gulpSettings = require("./gulpSettings.json");

var sources = [
	"./src/app/**/*.less",
	"./src/assets/**/*.less"
];

gulp.task("less-core", function() {
	return gulp.src(sources)
		.pipe(plumber(function(error) {
			gutil.log(error.message);
			this.emit("end");
		}))
		.pipe(lessImport("./src/assets/less/variables.less"))
		.pipe(less())
		.pipe(concat("main.css"))
		.pipe(compress.minifyCss())
		.pipe(gulp.dest(gulpSettings.distFolder + "/css"))
});