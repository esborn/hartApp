var gulp = require('gulp');
var replace = require('gulp-replace');
var gutil = require("gulp-util");
var gulpSettings = require("./gulpSettings.json");

var today = new Date();
var version = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}-${today.getHours()+1}-${today.getMinutes()+1}`;

gulp.task('copy-app-prod', function(){
        
    gulp.src(["./src/app/appConfig.js"])
        .pipe(gulp.dest(gulpSettings.distFolder + "/js"));
    gulp.src(["./src/index.html"])
        .pipe(gulp.dest(gulpSettings.distFolder));    
});