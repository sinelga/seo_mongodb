'use strict'

//angular.module('spBlogger',['spBlogger.posts','spBlogger.controllers','spBlogger.directives','spBlogger.filters','spBlogger.services']);
angular.module('spBlogger',['ngResource','ngCookies','ngSanitize','ngResource','ngAnimate','ui.router','spBlogger.admin','spBlogger.posts','spBlogger.controllers','spBlogger.directives','spBlogger.filters','spBlogger.services']);

//angular.module('spBlogger').config(function ($httpProvider) {
//    $httpProvider.defaults.transformRequest = function(data){
//        if (data === undefined) {
//            return data;
//        }
//        return $.param(data);
//    }
//});


angular.module('spBlogger').config(['$httpProvider',function($httpProvider){
//    $translateProvider.translations('en', {
//        TITLE: 'The Single Page Blogger',
//        SUBTITLE: 'One Stop Blogging Solution',
//        COMMENTS: 'Comments',
//        BY:'By',
//        ADD:'Add'
//    });
//
//    $translateProvider.translations('de', {
//        TITLE: 'Single Page Blogger',
//        SUBTITLE: 'Die Komplettlösung für Ihr Blog',
//        COMMENTS: 'Kommentare',
//        BY:'Von',
//        ADD:'Hinzufügen'
//    });

//    $translateProvider.preferredLanguage('en');

//    $httpProvider.defaults.withCredentials = true;

}]);




angular.module('spBlogger').run(['$state',function($state){

    $state.go('allPosts');
//	$state.go('admin.postNew');	

//    $rootScope.languagePreference={currentLanguage:'en'};
//
//    $rootScope.languagePreference.switchLanguage=function(key){
//        $translate.use(key);
//        $rootScope.languagePreference.currentLanguage=key;
//    }
}]);

//angular.module('spBlogger').value('version','V1.0');


//angular.module('spBlogger').run(['state , function(state){
//                                          $state.go('allPosts'); }]);