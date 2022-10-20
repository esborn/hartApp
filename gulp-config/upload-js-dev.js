var gulp = require('gulp'),
    spawn = require("child_process").spawn,
    child;

gulp.task('upload-js-dev', function(callback) {
    child = spawn("powershell.exe", [".\\scripts\\dev\\Deploy-DevEnv.ps1", "-QuickDeploy"]);
    child.stdout.on("data", function(data) {
        console.log("Powershell Data: " + data);
    });
    child.stderr.on("data", function(data) {
        console.log("Powershell Errors: " + data);
    });
    child.on("exit", function() {
        console.log("Powershell Script finished");
    });
    child.stdin.end(); //end input
    callback();
});