const gulp = require('gulp');
const jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js', '!node_modules/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

