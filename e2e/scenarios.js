'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */


var util = require('util');

describe('The Single Page Blogger E2E Test', function() {
	
	var ptor;
	
	beforeEach(function () {
	  ptor = protractor.getInstance();
	  ptor.get('http://localhost:3000/#/');
	});
		 
	 it('should do something', function () {

		 var posts = ptor.element.all(by.repeater('post in posts'));
		 
		 posts.first().then(function(postElem) {
			 			 
			 postElem.element(protractor.By.tagName('a')).then(function(a) {				

					a.click().then(function(ares) {

						ptor.getCurrentUrl().then(function(cururl) {
							console.log("url "+cururl);
							expect(cururl).toMatch('#/posts/1/simple-title1');
														
						});
						
					});
					
			});	 
			 			 
		 });
		 		 		 		 
	 });	 
	 
	});