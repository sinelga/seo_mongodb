'use strict'

angular.module('spBlogger.posts.controllers',[]).controller('PostController',['$scope','Post',function($scope,Post){

	
	console.log("1111111");
	$scope.posts=Post.query();
	console.log($scope.posts);
	

}]).controller('PostDetailsController',['$stateParams','$state','$scope','Post',function($stateParams,$state,$scope,Post){

    $scope.closePost=function(){
        $state.go('allPosts');
    };

//    $scope.singlePost=Post.get({id:$stateParams.id});
    console.log("id "+$stateParams.id);
    
    $scope.singlePost=Post.get({id:$stateParams.id});	

}]);