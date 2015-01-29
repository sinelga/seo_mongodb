"use strict";function helloWorld(){return"Hello world!"}angular.module("spBlogger.posts.services",[]).factory("postService",function(){return{posts:[{id:1,title:"Simple title1",content:"Sample content...",permalink:"simple-title1",author:"Sandeep",datePublished:"2012-04-04"},{id:2,title:"Simple title2",content:"Sample content...",permalink:"simple-title2",author:"Sandeep",datePublished:"2012-05-04"},{id:3,title:"Simple title3",content:"Sample content...",permalink:"simple-title3",author:"Sandeep",datePublished:"2012-06-04"},{id:4,title:"Simple title4",content:"Sample content...",permalink:"simple-title4",author:"Sandeep",datePublished:"2012-07-04"}],getAll:function(){return this.posts},getPostById:function(t){for(var e in this.posts)if(this.posts[e].id==t)return this.posts[e]}}}),angular.module("spBlogger.posts.filters",[]),angular.module("spBlogger.posts.directives",[]).directive("spbComments",["Post",function(){return{restrict:"AEC",scope:{postInstance:"="},replace:!0,link:function(t){t.saveComment=function(){var e=(t.postInstance._id,{});t.comment.datePublished=new Date,angular.copy(t.postInstance,e),e.comments.unshift(t.comment),t.postInstance.comments.unshift(t.comment),t.comment={},e.$update()}},templateUrl:"modules/posts/views/comments.html"}}]),angular.module("spBlogger.posts.controllers",[]).controller("PostController",["$scope","Post",function(t,e){console.log("1111111"),t.posts=e.query(),console.log(t.posts)}]).controller("PostDetailsController",["$stateParams","$state","$scope","Post",function(t,e,o,s){o.closePost=function(){e.go("allPosts")},console.log("id "+t.id),o.singlePost=s.get({id:t.id})}]),angular.module("spBlogger.admin.services",[]).factory("Post",["$resource","API_ENDPOINT",function(t,e){return t(e,{id:"@_id"},{update:{method:"PUT"}})}]).service("popupService",["$window",function(t){this.showPopup=function(e){return t.confirm(e)}}]).factory("authService",["AUTH_ENDPOINT","LOGOUT_ENDPOINT","$http","$cookieStore",function(t,e,o,s){var l={};return l.login=function(e,n){return o.post(t,{username:e,password:n}).then(function(t){return l.user=t.data,s.put("user",l.user),l.user})},l.logout=function(){return o.post(e).then(function(){l.user=void 0,s.remove("user")})},l}]),angular.module("spBlogger.admin.services").value("API_ENDPOINT","http://104.236.237.125:8080/api/posts/:id"),angular.module("spBlogger.admin.services").value("AUTH_ENDPOINT","http://104.236.237.125:8080/login"),angular.module("spBlogger.admin.services").value("LOGOUT_ENDPOINT","http://104.236.237.125:8080/logout"),angular.module("spBlogger.admin.filters",[]).filter("permalink",function(){return function(t){return void 0===t?"":angular.lowercase(t).replace(/[\s]/g,"-")}}).filter("wordcount",function(){return function(t){return void 0===t?0:t.split(/\s/g).length}}),angular.module("spBlogger.admin.directives",[]).directive("onClickMakeActive",function(){return{restrict:"AEC",link:function(t,e){e.find("li").bind("click",function(t){angular.element(t.currentTarget).addClass("active"),angular.element(t.currentTarget).siblings("li").removeClass("active")})}}}),angular.module("spBlogger.admin.controllers",[]).controller("PostCreationController",["$scope","$state","Post",function(t,e,o){t.post=new o,t.buttonText="Create",t.savePost=function(){t.buttonText="Saving. . .",t.post.permalink=angular.lowercase(t.post.title).replace(/[\s]/g,"-"),t.post.$save(function(){e.go("admin.postViewAll")})}}]).controller("PostUpdateController",["$scope","Post","$stateParams","$state",function(t,e,o,s){t.post=e.get({id:o.id}),t.buttonText="Update",t.updatePost=function(){t.buttonText="Updating. . .",t.post.$update(function(){s.go("admin.postUpdate",{id:o.id},{reload:!0})})}}]).controller("PostListController",["$scope","Post","popupService","$state",function(t,e,o,s){t.posts=e.query(),t.deletePost=function(t){o.showPopup("Really delete this?")&&t.$delete(function(){s.go("admin.postViewAll",void 0,{reload:!0})})}}]).controller("LoginController",["$scope","authService","$state",function(t,e,o){t.buttonText="Login",t.login=function(){t.buttonText="Logging in. . .",e.login(t.credentials.username,t.credentials.password).then(function(){o.go("admin.postViewAll")},function(){t.invalidLogin=!0}).finally(function(){t.buttonText="Login"})}}]).controller("AdminController",["$scope","authService","$state","user",function(t,e,o){t.logout=function(){e.logout().then(function(){o.go("login")})}}]),angular.module("spBlogger.posts",["spBlogger.posts.controllers","spBlogger.posts.directives","spBlogger.posts.services","spBlogger.posts.filters"]),angular.module("spBlogger.posts").config(["$stateProvider","$locationProvider",function(t){t.state("allPosts",{url:"/posts",templateUrl:"app/modules/posts/views/posts.html",controller:"PostController"}),t.state("singlePost",{url:"/posts/:id/:permalink",templateUrl:"app/modules/posts/views/singlePost.html",controller:"PostDetailsController"})}]),angular.module("spBlogger.admin",["spBlogger.admin.controllers","spBlogger.admin.directives","spBlogger.admin.services","spBlogger.admin.filters"]),angular.module("spBlogger.admin").config(["$stateProvider",function(t){t.state("login",{url:"/login",controller:"LoginController",resolve:{user:["authService","$q",function(t,e){return t.user?e.reject({authorized:!0}):void 0}]},templateUrl:"app/modules/admin/views/login.html"}).state("admin",{url:"/admin","abstract":!0,controller:"AdminController",resolve:{user:["authService","$q",function(t,e){return t.user||e.reject({unAuthorized:!0})}]},templateUrl:"app/modules/admin/views/admin-home.html"}).state("admin.postNew",{url:"/posts/new",controller:"PostCreationController",templateUrl:"app/modules/admin/views/admin-new-post.html"}).state("admin.postUpdate",{url:"/posts/:id/edit",controller:"PostUpdateController",templateUrl:"app/modules/admin/views/admin-update-post.html"}).state("admin.postViewAll",{url:"",controller:"PostListController",templateUrl:"app/modules/admin/views/admin-all-posts.html"})}]).run(["$rootScope","$state","$cookieStore","authService",function(t,e,o,s){t.$on("$stateChangeError",function(t,o,s,l,n,r){r.unAuthorized?e.go("login"):r.authorized&&e.go("admin.postViewAll")}),s.user=o.get("user")}]),angular.module("spBlogger.services",[]),angular.module("spBlogger.filters",[]),angular.module("spBlogger.directives",[]),angular.module("spBlogger.directives").directive("appVersion",["version",function(t){return{restrict:"AE",link:function(e,o){o.html(t)}}}]),angular.module("spBlogger.controllers",[]),angular.module("spBlogger",["ngResource","ngCookies","ngSanitize","ngResource","ngAnimate","ui.router","spBlogger.admin","spBlogger.posts","spBlogger.controllers","spBlogger.directives","spBlogger.filters","spBlogger.services"]),angular.module("spBlogger").config(["$httpProvider",function(){}]),angular.module("spBlogger").run(["$state",function(t){t.go("allPosts")}]),angular.module("spBlogger").run(["$templateCache",function(t){t.put("app/modules/posts/views/comments.html",'<div class="row"><div class="col-xs-12"><h3>{{\'COMMENTS\' | translate}}</h3><br><textarea cols="40" rows="5" class="form-control" ng-model="comment.content" placeholder="Type your comment here"></textarea><br>{{\'BY\' | translate}} : <input type="text" ng-model="comment.author" class="form-control" placeholder="Type your name here"><br><input type="submit" value="{{\'ADD\' | translate}}" ng-click="saveComment()" class="btn btn-success small-button"><hr><div class="comments-list"><div class="single-comment" ng-repeat="comment in postInstance.comments"><div class="content">{{comment.content}}</div><div class="info">{{\'BY\' | translate}} : <span>{{comment.author}}</span> | On: <span>{{comment.datePublished | date:\'MM-dd-yy\'}}</span></div></div></div></div></div>'),t.put("app/modules/posts/views/posts.html",'<div class="row"><div class="col-xs-3" ng-repeat="post in posts track by $index"><div class="well"><h3 class="postTitle"><a ui-sref="singlePost({id:post._id,permalink:post.permalink})">{{post.title}}</a></h3><h5>By: {{post.author}} | {{post.datePublished}}</h5></div></div></div>'),t.put("app/modules/posts/views/singlePost.html",'<div class="row"><div class="col-xs-8 col-xs-offset-2 singlePost"><span class="pull-right cross-btn" ng-click="closePost()">&times;</span><h1>{{singlePost.title}}</h1><h5>{{\'BY\'}}: {{singlePost.author}} | {{singlePost.datePublished | date:\'MM-dd-yyyy\'}}</h5><div class="postContent" ng-bind-html="singlePost.content"></div></div></div>'),t.put("app/modules/admin/views/admin-all-posts.html",'<div class="row"><div class="col-xs-8"><table class="table"><tr><td><h3>View All Posts</h3></td><td></td></tr><tr ng-repeat="post in posts | orderBy:\'-_id\'"><td>{{post.title}}</td><td><a class="btn btn-primary" ui-sref="admin.postUpdate({id:post._id})">Edit</a> <a class="btn btn-danger" ng-click="deletePost(post)">Delete</a></td></tr></table></div></div>'),t.put("app/modules/admin/views/admin-home.html",'<div class="row"><div class="col-xs-3"><ul class="nav nav-pills nav-stacked on-click-make-active"><li ui-sref-active="active"><a ui-sref="admin.postViewAll">View All Posts</a></li><li ui-sref-active="active"><a ui-sref="admin.postNew">Add Post</a></li></ul></div><div class="col-xs-9 border-left"><div ui-view=""></div></div></div>'),t.put("app/modules/admin/views/admin-new-post.html",'<div class="row"><div class="col-xs-8"><form name="postForm" ng-submit="savePost()" class="form-horizontal" novalidate="" role="form"><div ng-include="\'app/modules/admin/views/form.html\'" <="" form=""></div></form></div></div>'),t.put("app/modules/admin/views/admin-update-post.html",'<div class="row"><div class="col-xs-8"><form name="postForm" ng-submit="updatePost()" class="form-horizontal" novalidate="" role="form"><div ng-include="\'app/modules/admin/views/form.html\'" <="" form=""></div></form></div></div>'),t.put("app/modules/admin/views/form.html",'<div class="form-group" ng-class="{\'has-error\':postForm.title.$dirty && postForm.title.$invalid}"><label for="title" class="col-sm-2 control-label">Post Title</label><div class="col-sm-10"><input type="text" name="title" ng-model="post.title" ng-required="true" class="form-control" id="title" placeholder="Title"> <span>Permalink:<i>/posts/[id]/{{post.title | permalink}}</i></span><br><span class="error-message" ng-show="postForm.title.$dirty && postForm.title.$invalid">Title is mandatory boss!</span></div></div><div class="form-group" ng-class="{\'has-error\':postForm.content.$dirty && postForm.content.$invalid}"><label for="content" class="col-sm-2 control-label">Content</label><div class="col-sm-10"><textarea cols="8" rows="6" name="content" class="form-control" ng-model="post.content" ng-required="true" id="content" placeholder="Content"></textarea> <span>{{post.content | wordcount}} words</span><br><span class="error-message" ng-show="postForm.content.$dirty && postForm.content.$invalid">You need to have some content!</span></div></div><div class="form-group" ng-class="{\'has-error\':postForm.tags.$dirty && postForm.tags.$invalid}"><label for="tags" class="col-sm-2 control-label">Tags</label><div class="col-sm-10"><input type="text" name="tags" class="form-control" id="tags" ng-pattern="/^[\\w,]+$/" ng-model="post.tags" placeholder="Comma separated tags"> <span class="error-message" ng-show="postForm.tags.$dirty && postForm.tags.$invalid">Sorry! No special characters allowed here.</span></div></div><div class="form-group" ng-class="{\'has-error\':postForm.keywords.$dirty && postForm.keywords.$invalid}"><label for="keywords" class="col-sm-2 control-label">Keywords</label><div class="col-sm-10"><input type="text" name="keywords" class="form-control" id="keywords" ng-pattern="/^[\\w,]+$/" ng-model="post.keywords" placeholder="Comma separated keywords"> <span class="error-message" ng-show="postForm.keywords.$dirty && postForm.keywords.$invalid">Sorry! No special characters allowed here</span></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="submit" class="btn btn-success" ng-disabled="postForm.$invalid">{{buttonText}}</button></div></div>'),t.put("app/modules/admin/views/login.html",'<div class="row"><div class="col-sm-6 col-md-4 col-md-offset-4"><h1 class="text-center login-title">Login to Admin Panel</h1><div class="account-wall"><form class="form-signin" ng-submit="login()"><div ng-show="invalidLogin" class="alert alert-danger">Invalid username/password</div><input type="text" class="form-control" placeholder="Username" ng-model="credentials.username" ng-required="true"> <input type="password" class="form-control" placeholder="Password" ng-model="credentials.password" ng-required="true"> <button class="btn btn-lg btn-primary btn-block" type="submit">{{buttonText}}</button></form></div></div></div>')}]);