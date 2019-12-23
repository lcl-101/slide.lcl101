/*
  Slide.js 构建
 */
const gulp = require("gulp");
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');

gulp.task('build',function(){
    gulp.src('./src/slide.js').pipe(uglify()).pipe(gulp.dest('./dist'));
});