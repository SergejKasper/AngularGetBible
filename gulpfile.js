var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var ghPages = require('gulp-gh-pages');
var angularTemplates = require('gulp-angular-templates'); 

/*
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

gulp.task('templates', function () {
    return gulp.src(path.join(sourceDirectory, '/**/*.html'))
        .pipe(angularTemplates({module: 'angularGetBible.templates'}))
        .pipe(plumber())
        .pipe(concat('angular-get-bible.templates.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('angular-get-bible.templates.min.js'))
        .pipe(gulp.dest('./dist'));
});

var sourceFiles = [

  // Make sure module files are handled first
  path.join(sourceDirectory, '/**/*.module.js'),

  // Then add all JavaScript files
  path.join(sourceDirectory, '/**/*.js')
];

var lintFiles = [
  'gulpfile.js',
  // Karma configuration
  'karma-*.conf.js'
].concat(sourceFiles);

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(concat('angular-get-bible.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('angular-get-bible.min.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('jshint', 'test-src','templates', 'build', done);
});

/**
 * Watch task
 */
gulp.task('watch', function () {

  // Watch JavaScript files
  gulp.watch(sourceFiles, ['process-all']);
});

/**
 * Validate source JavaScript
 */
gulp.task('jshint', function () {
  return gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('deploy', function() {
  return gulp.src(['./dist/**/*', path.join(rootDirectory + '/index.html')])
    .pipe(ghPages());
});

gulp.task('default', function () {
  runSequence('process-all', 'watch');
});
