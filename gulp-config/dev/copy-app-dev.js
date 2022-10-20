var gulp = require('gulp');
var replace = require('gulp-replace');
var gutil = require("gulp-util");
var envConfig = require('../../dev.config.json');
var gulpSettings = require("../gulpSettings.json");

var today = new Date();
var version = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}`;

// this configures index.html and app.config with local dev settings 
gulp.task('copy-app-dev', function(){
        
    //gutil.log(envConfig.baseUrl);
    gutil.log(envConfig.SiteUrl);   
    gutil.log(version);
    
    gulp.src([
            "./src/index.html"
        ])        
        .pipe(replace('#{HART.SharePoint.SiteRelativeUrl}', envConfig.SiteUrl))
        .pipe(replace('#{HART.SharePoint.SiteUrl}', envConfig.SiteUrl))
        .pipe(replace('#{Octopus.Release.Number}', version))
        .pipe(gulp.dest(gulpSettings.distFolder));

    gulp.src([
        "./src/app/appConfig.js"
    ])        
    .pipe(replace('#{HART.SharePoint.SiteRelativeUrl}', envConfig.SiteUrl))
        .pipe(replace('#{HART.SharePoint.SiteUrl}', envConfig.SiteUrl))
        .pipe(replace('#{Octopus.Release.Number}', version))
    .pipe(gulp.dest(gulpSettings.distFolder + "/js"));
});