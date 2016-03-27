var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    karma = require('karma').Server;


gulp.task('jshint', function() {
  gulp.src('./src/angular-aba-routing-validation.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('dist', function() {
  // first copy the pretty version to ./dist
  gulp.src('./src/angular-aba-routing-validation.js')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/angular-aba-routing-validation.js')
    .pipe(uglify())
    .pipe(rename('angular-aba-routing-validation.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
