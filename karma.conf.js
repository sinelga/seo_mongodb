'use strict';

module.exports = function(config) {

  config.set({
//    autoWatch : false,
	  basePath: '',
    
    frameworks: ['jasmine'],
    
//   files: ['/home/juno/git/3_fi_FIporno_desk/test/unit/tstSpec.js'],

    browsers : ['PhantomJS'],

    plugins : [
        'karma-phantomjs-launcher',
        'karma-firefox-launcher',
        'karma-jasmine'
    ]
  });
};
