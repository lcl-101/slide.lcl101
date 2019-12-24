/*
  Slide.js 构建
 */
const gulp = require("gulp");
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');
const plugins = require('gulp-load-plugins')();

/**
 * build:css
 */
gulp.task('build:css',function(){
    gulp.src('./src/css/*.css')
        .pipe(minify({compatibility: 'ie7'}))
        .pipe(gulp.dest('./dist/css'));
});

/**
 * build:js
 */
gulp.task('build:js',function(){
    gulp.src('./src/slide.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

/**
 *
 */
gulp.task('default',function(callback){
    plugins.sequence(
        "build:css",
        "build:js"
    )(callback);
});