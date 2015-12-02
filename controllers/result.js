'use strict';
/**
 * @ngdoc function
 * @name restaurantAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantAppApp
 */

var app = angular.module('starterApp');
  
app.controller('ResultCtrl', function ($scope, $route, $routeParams, $location, $http) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  console.log("ResultCtrl");
  console.log($routeParams);
  
//  $http.get('data/posts.json').
//    success(function(data, status, headers, config) {
//      $scope.posts = data;
//    }).
//    error(function(data, status, headers, config) {
//      // log error
//    });
  
  var request = $http.get('/Game/Result');
  request.success(function(data){
    console.log(data);
  });
  
});