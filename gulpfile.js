'use strict';

var gulp         = require('gulp'),
browserSync      = require('browser-sync'),
sass             = require('gulp-sass'),
autoprefixer     = require('gulp-autoprefixer'),
cssmin           = require("gulp-cssmin"),
uglify           = require('gulp-uglify'),
rename           = require('gulp-rename'),
concat           = require('gulp-concat'),
mapstream        = require('map-stream'),
argv             = require('yargs').argv,
jsonFormat       = require('gulp-json-format'),
runSequence      = require('run-sequence');

// Configuration
var configuration = {
  basename: 'kapusons-ui-map',
  paths: {
    src: {
      html: [
          './src/html/*.html',
          './src/html/italy/*.html',
          './src/html/world/*.html'
      ],
      json: [
      './src/json/*.json'
      ], 
      jsonFolder: './src/json/',
      img: './src/img/**/*',
      scss: [
        './src/scss/**/*.scss'
      ],
      js: [
          './src/js/application.js'
      ]
  },
  dist: './dist'
}
};


//styles
gulp.task('build:styles', function() {
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
gulp.task('build:scripts', function() {
  return gulp.src(configuration.paths.src.js)
  .pipe(concat(configuration.basename + '.js'))
  .pipe(gulp.dest(configuration.paths.dist))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify().on('error', function (e) {
    console.log(e);
}))
  .pipe(gulp.dest(configuration.paths.dist))
});

gulp.task('build:html', function() {
  gulp.src(configuration.paths.src.html, {base: "./src/html/"})
  .pipe(gulp.dest(configuration.paths.dist))
});

gulp.task('build:json', function() {
  gulp.src(configuration.paths.src.json, {base: "./src/"})
  .pipe(gulp.dest(configuration.paths.dist))
});

gulp.task('build:img', function() {
  gulp.src(configuration.paths.src.img)
  .pipe(gulp.dest(configuration.paths.dist + '/img'))
});

gulp.task('makejson', function() {

  if(!argv.regions || typeof(argv.regions) != 'string'){
    console.log('!### Error: specify at least a country or a region by passing a --regions parameter e.g. --regions "AFG,ARE,ZWE,IDN"');
    return ;
  }

  if(!argv.featureProperty || typeof(argv.featureProperty) != 'string'){
      console.log('!### Error: specify a feature property to match by passing a --featureProperty parameter e.g. --featureProperty SOV_A3');
      return;
  }

  if(!argv.searchIn || typeof(argv.searchIn) != 'string'){
      console.log('!### Error: specify what json to search in by passing a --searchIn parameter \n e.g. --searchIn world \n italy and world are availables');
      return;
  }

  return gulp.src(configuration.paths.src.jsonFolder + argv.searchIn + '.json')
    .pipe(mapstream(function(file, done) {

        var json = JSON.parse(file.contents.toString());
        var featureSubset = [];
        var aReg = argv.regions.split(',').map(function(el){
            return el.toLowerCase();
        });

        for (var x = 0; x < json.features.length; x++){
            if(aReg.indexOf(json.features[x].properties[argv.featureProperty].toLowerCase()) != -1){
                featureSubset.push(json.features[x]);
            }
        }

        var featureSubsetProperties = featureSubset.map(function(el){
            return el.properties[argv.featureProperty].toLowerCase();
        });

        var notFound = aReg.filter(function(x) { 
            return featureSubsetProperties.indexOf(x) < 0 
        });

        if(notFound.length){
          console.log('!### Warning > regions not found: ' + notFound);  
        }
        
        var transformedJson = {
         "type": "FeatureCollection",
         "features": featureSubset
        };


        file.contents = new Buffer(JSON.stringify(transformedJson));
        done(null, file);
    }))
    .pipe(jsonFormat(4))
    .pipe(rename({ suffix: '.subset' }))
    .pipe(gulp.dest(configuration.paths.src.jsonFolder))
});


//watch
gulp.task('serve', ['build'], function() {

  browserSync(Object.assign({}, {
    notify: false,
    logPrefix: 'BrowserSync',
    port: process.env.PORT || 5000,
    'server': ['./dist/']
  }, {}));

  //watch .scss files
  gulp.watch(configuration.paths.src.scss, ['build:styles', 'build:img', browserSync.reload]);

  //watch .js files
  gulp.watch(configuration.paths.src.js, ['build:scripts', browserSync.reload]);

  //watch .html files
  gulp.watch(configuration.paths.src.html, ['build:html', browserSync.reload]);

  //watch images files
  gulp.watch(configuration.paths.src.img, ['build:img', browserSync.reload]);

  //watch GeoJson files
  gulp.watch(configuration.paths.src.json, ['build:json', browserSync.reload]);

});

gulp.task('build', function(callback) {
    runSequence(['build:html', 'build:json', 'build:img', 'build:styles', 'build:scripts'],
        callback);
});

gulp.task('default', ['build']);

