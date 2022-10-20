var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("../webpack.config.js");
var gulpSettings = require("./gulpSettings.json");

var devCompiler, prodCompiler;

initDev();
initProd();

gulp.task("js-core-dev", ["lint"], function (cb) {    
    runWebpack(devCompiler, cb);
});

gulp.task("js-core-prod", ["lint"], function (cb) {    
    runWebpack(prodCompiler, cb);
});

function initDev() {
    var config = Object.create(webpackConfig);

    setOutputDirectory(config);
    config.devtool = "sourcemap";
    config.debug = true;

    devCompiler = webpack(config);
}

function initProd() {
    var config = Object.create(webpackConfig);

    setOutputDirectory(config);
    config.plugins = config.plugins || [];
    config.plugins = config.plugins.concat(
        new webpack.optimize.UglifyJsPlugin({
            compress: false,
            sourceMap: false,
            mangle: false
        })
    );

    prodCompiler = webpack(config);
}

function runWebpack(compiler, cb) {
    compiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        cb();
    });
}

function setOutputDirectory(config) {
    config.output.path = gulpSettings.distFolder + "/js";
}