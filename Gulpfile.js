/**
 *
 * Config item
 *
 */
var config = {
  app: './app/',
  build: '.build',
  src: './src/',
  bower: './bower_components/'
};

var path = {
  assets: config.app+'assets/',
  scss : config.src+'scss/',
  js : config.src+'js/'
}

/**
 *
 * Required
 *
 */
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins'),
    $ = plugins(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    argv = require('yargs').argv;


/**
 *
 * SCSS task
 *
 */
var sassOptions = {
  errLogToConsole: true,
  includePaths: [
    config.bower,
    config.bower+'csskit/src/scss'
  ],
  outputStyle: 'nested'
};

var prefixerOptions = {
  browsers: [
    'last 2 versions',
    '> 1%',
    'ie 9'
  ]
};

gulp.task('scss', function () {
  return gulp
    .src(path.scss+'app.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions).on('error', $.sass.logError))
    .pipe($.autoprefixer(prefixerOptions))
    .pipe($.if(argv.production, $.cssmin()))
    .pipe($.if(argv.production, $.rename({suffix: '.min'})))
    .pipe($.if(!argv.production, $.sourcemaps.write('../sourcemaps')))
    .pipe(gulp.dest(path.assets+'css'))
    .pipe(reload({
      stream:true
    }));
});


/**
 *
 * Scripts task
 *
 */
var uglifyOptions = {
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  }
}
gulp.task('script', function(){
  return gulp
    .src([
      path.js+'lib/lib1.js',
      path.js+'lib/lib2.js',
      path.js+'main.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.if(argv.production, $.uglify(uglifyOptions)))
    .pipe($.if(argv.production, $.rename({suffix: '.min'})))
    .pipe($.if(!argv.production, $.sourcemaps.write('../sourcemaps')))
    .pipe(gulp.dest(path.assets+'js'))
    .pipe(reload({
      stream:true
    }));
});


/**
 *
 * HTML task
 *
 */
gulp.task('html', function(){
  return gulp
    .src(config.app+'**/*.html')
    .pipe(reload({
      stream:true
    }));
});


/**
 *
 * Build task
 *
 */
// clear out all file and folder from build folder
// gulp.task('build:cleanfolder', function(cb){
//   del([
//     config.build+'**'
//   ], cb);
// });

// create build folder
// gulp.task('build:copy', ['build:cleanfolder'], function(){
//   return gulp
//     .src(config.app+'**/*')
//     pipe(gulp.dest(config.build));
// });

// remove unwanted build files
// list all files and directories here that you don't want to include
// gulp.task('build:remove', ['build:copy'], function(cb){
//   del([
//     config.build+'assets/sourcemaps/',
//     config.build+'assets/css/!(*.min.css)',
//     config.build+'assets/js/!(*.min.js)'
//   ], cb);
// });


/**
 *
 * Browser-Sync task
 *
 */
gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: config.app
    }
  });
});

// gulp.task('build-serve', function(){
//   browserSync({
//     server: {
//       baseDir: config.app
//     }
//   });
// });


/**
 *
 * Watch task
 *
 */
gulp.task('watch', function(){
  gulp.watch('./Gulpfile.js', ['base']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch(path.scss+'**/*.scss', ['scss']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch(path.js+'**/*.js', ['script']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch(config.app+'**/*.html', ['html']).on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});


/**
 *
 * Default task
 *
 */
gulp.task('base', ['scss', 'script', 'html']);
gulp.task('default', ['base', 'browser-sync', 'watch']);
// gulp.task('build', ['build:copy', 'build:remove']);