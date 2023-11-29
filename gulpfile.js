const gulp = require('gulp');
const jshint = require('gulp-jshint');

gulp.task('lint', () => {
  return gulp.src(['./src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', gulp.series('lint'));
