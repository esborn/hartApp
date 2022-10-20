var gulp = require("gulp");
var gulpSettings = require("./gulpSettings.json");

gulp.task("copy-assets", function() {
	gulp.src(["./src/assets/img/**/*"])
		.pipe(gulp.dest(gulpSettings.distFolder + "/img"));

	gulp.src(["./src/assets/fonts/**/*"])
		.pipe(gulp.dest(gulpSettings.distFolder + "/fonts"));
        
  gulp.src(["./src/assets/i18n/**/*"])
		.pipe(gulp.dest(gulpSettings.distFolder + "/i18n"));
		
});