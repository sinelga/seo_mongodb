'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep');

var paths = gulp.paths;


function runTests (singleRun, done) {
	
//	gutil.log(gulp.paths);
//	gutil.log(gulp.src);
//  var bowerDeps = wiredep({
//    directory: 'bower_components',
//    exclude: ['bootstrap-sass-official'],
//    dependencies: true,
//    devDependencies: true
//  });

//  var testFiles = bowerDeps.js.concat([
//    '/home/juno/git/3_fi_FIporno_desk/src/app/js/tst.js','/home/juno/git/3_fi_FIporno_desk/test/unit/tstSpec.js'
//  ]);
//  var testFiles = bowerDeps.js.concat([
//      
//                                   
//      paths.src + '/{app/js,test}/**/*.js'
//  ]);
  
//	 var testFiles =js.concat([
//    '/home/juno/git/3_fi_FIporno_desk/src/app/js/tst.js','/home/juno/git/3_fi_FIporno_desk/test/unit/tstSpec.js']);                         
//	var testFiles =[paths.src+'/app/js/tst.js','test/unit/tstSpec.js']
	var testFiles =[
	                paths.bower_components+'/angular/angular.js',
//	                paths.bower_components+'/angular-ui-router/angular-*.js',
	                paths.bower_components+'/angular-mocks/angular-*.js',
	                paths.src+'/app/modules/**/*.js',
	                paths.src+'/app/js/tst.js',
	                paths.test +'/unit/*.js'
	                ]
  
  
//	gulp.src('/home/juno/git/3_fi_FIporno_desk/src/app/js/tst.js')
  gulp.src(testFiles).pipe($.karma({
      configFile: 'karma.conf.js',
      action: (singleRun)? 'run': 'watch'
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
}

gulp.task('test', function (done) { runTests(true /* singleRun */, done) });
gulp.task('test:auto', function (done) { runTests(false /* singleRun */, done) });
