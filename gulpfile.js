'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const KarmaServer = require('karma').Server;
const path = require('path');


gulp.task('lint', function() {
  gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('dist', ['lint', 'test'], function() {
  // first copy the pretty version to ./dist
  gulp.src('./src/angular-aba-routing-validation.js')
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/angular-aba-routing-validation.js')
    .pipe(uglify({
      preserveComments: 'license',
    }))
    .pipe(rename('angular-aba-routing-validation.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function(done) {
  new KarmaServer({
    configFile: path.join(__dirname, '/karma.conf.js'),
    singleRun: true,
  }, done).start();
});
