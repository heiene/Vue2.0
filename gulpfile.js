var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


gulp.task('styles', function() {
	gulp.src('scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('styles.css'))
		.pipe(autoprefixer())
		.pipe(gulp.dest('build'))
});

gulp.task('default', function (){
	gulp.watch('scss/**/*scss', ['styles'])
})