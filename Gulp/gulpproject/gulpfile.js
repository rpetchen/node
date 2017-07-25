var gulp = require('gulp')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var clean = require('gulp-clean-css')
var maps = require('gulp-sourcemaps')
var imageMin = require('gulp-imagemin')
var  del = require('del');
var webserver = require('gulp-webserver')



gulp.task('scripts', function(){
return gulp.src('js/**/*.js')
	.pipe(concat('all.min.js'))
	.pipe(maps.init())
	.pipe(uglify())
	 .pipe(maps.write('./'))
	.pipe(gulp.dest('./dist/scripts'))
})

gulp.task('styles', function(){
return gulp.src('sass/**/*.scss')
	.pipe(sass())
	.pipe(maps.init())
	.pipe(concat('all.min.css'))
	.pipe(clean())
	 .pipe(maps.write('./'))
	.pipe(gulp.dest('./dist/styles'))

})

gulp.task('images', function(){
	return gulp.src('images/*')
	.pipe(imageMin())
	.pipe(gulp.dest('./dist/content'))
})

gulp.task('clean', function() {
  del(['dist/*']);
});


gulp.task("build", ['clean', 'styles', 'images', 'scripts'], function() {
});

gulp.task('default', ["build"], function(){
	gulp.src('./')
	 .pipe(webserver({
      livereload: true,
      directoryListing: { 
      	open: true,
   		path: './'}
    }));
})