'use strict';

var gulp         = require('gulp'),
browserSync      = require('browser-sync'),
sass             = require('gulp-sass'),
autoprefixer     = require('gulp-autoprefixer'),
cssmin           = require("gulp-cssmin"),
uglify           = require('gulp-uglify'),
rename           = require('gulp-rename'),
concat           = require('gulp-concat');

// Configuration
var configuration = {
  basename: 'kapusons-ui-map',
  paths: {
    src: {
      html: [
      './src/html/*.html',
      './src/html/region-detail/*.html'
      ],
      img: './src/img/**/*',
      scss: [
        './src/scss/**/*.scss'
      ],
      js: [
        './bower_components/jquery/dist/jquery.js',
        './node_modules/perfect-scrollbar/dist/perfect-scrollbar.js',
        './src/js/configuration.js',
        './src/js/application.js'
      ]
    },
    dist: './dist'
  }
};

//styles
gulp.task('styles', function() {
  return gulp.src(configuration.paths.src.scss)
  .pipe(sass({
    sourceComments: true,
    outputStyle: 'nested'
  }).on('error', sass.logError))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(concat(configuration.basename + '.css'))
  .pipe(gulp.dest(configuration.paths.dist))
  .pipe(rename({ suffix: '.min' }))
  .pipe(cssmin())
  .pipe(gulp.dest(configuration.paths.dist))
});

//scripts
gulp.task('scripts', function() {
  return gulp.src(configuration.paths.src.js)
  .pipe(concat(configuration.basename + '.js'))
  .pipe(gulp.dest(configuration.paths.dist))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify().on('error', function (e) {
    console.log(e);
  }))
  .pipe(gulp.dest(configuration.paths.dist))
});

gulp.task('html', function() {
  gulp.src(configuration.paths.src.html)
  .pipe(gulp.dest(configuration.paths.dist))
});

gulp.task('img', function() {
  gulp.src(configuration.paths.src.img)
  .pipe(gulp.dest(configuration.paths.dist + '/img'))
});


//watch
gulp.task('serve', function() {

  browserSync(Object.assign({}, {
    notify: false,
    logPrefix: 'BrowserSync',
    port: process.env.PORT || 5000,
    'server': ['./dist/']
  }, {}));

  //watch .scss files
  gulp.watch(configuration.paths.src.scss, ['styles', 'img', browserSync.reload]);

  //watch .js files
  gulp.watch(configuration.paths.src.js, ['scripts', browserSync.reload]);

  //watch .html files
  gulp.watch(configuration.paths.src.html, ['html', browserSync.reload]);

  //watch images files
  gulp.watch(configuration.paths.src.img, ['img', browserSync.reload]);

});

gulp.task('default', ['html', 'img', 'styles', 'scripts']);