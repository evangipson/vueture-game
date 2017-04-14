var gulp = require("gulp");
var concat = require("gulp-concat");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
//var uglify = require("gulp-uglify");
//var babel = require("gulp-babel");
//var es2015 = require('babel-preset-es2015');
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var run = require("run-sequence");

// All the logs we'll use
var logs = {
    introMessage: "Running Gulp to build SASS and JavaScript...",
    sass: "Finished building SCSS into css/style.css...",
    //javascript: "Ensuring javascript will build...",
    endMessage: "Bundling up javascript into one file for deployment..."
};

gulp.task("begin", function() {
    gutil.log(logs.introMessage);
});

gulp.task("sass", function() {
    gutil.log(logs.sass);
    return gulp.src("src/scss/*.scss")
    .pipe(sass({outputStyle: 'extended'})
        .on("error", function(e) {
            gutil.log(e);
        }))
    .pipe(concat("style.css"))
    .pipe(gulp.dest("./dist/css"));
});

/* gulp.task("javascript", function() {
    gutil.log(logs.javascript);
    return gulp.src("src/js/*.js")
    .pipe(babel({ presets: [es2015] }))
    .pipe(concat("vueture.js"))
    //.pipe(uglify().on('error', function(e){
         //gutil.log(e);
    //}))
    .pipe(gulp.dest("./dist/js"));
}); */

gulp.task("end", function(done) {
    webpack(webpackConfig).run(onBuild(done));
    gutil.log(logs.endMessage);
});

function onBuild(done) {
    return function(err, stats) {
        if (err) {
            gutil.log('Error', err);
            if (done) {
                done();
            }
        } else {
            Object.keys(stats.compilation.assets).forEach(function(key) {
                gutil.log('Webpack: output ', gutil.colors.green(key));
            });
            gutil.log('Webpack: ', gutil.colors.blue('finished - javascript packaged!'));
            if (done) {
                done();
            }
        }
    }
}

/* You have to set up a default task, so lets run
 * all the gulp.tasks we defined above */
gulp.task("default", function() {
    run("begin", "sass", "end");
});