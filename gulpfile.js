var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


gulp.task('sass', function() {
  return gulp.src('public/stylesheets/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('sass:watch', function() {
  gulp.watch('public/stylesheets/sass/*.scss', ['sass']);
});

gulp.task('js-concat', function() {
  return gulp.src([
      'public/javascripts/modules/coin.js', 
      'public/javascripts/modules/board.js',
      'public/javascripts/modules/machine.js', 
      'public/javascripts/modules/game.js',
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/javascripts'));
})

gulp.task('js:watch', function () {
  gulp.watch('public/javascripts/modules/*.js', ['js-concat']);
});


gulp.task('default', ['js-concat', 'sass', 'sass:watch', 'js:watch']);





