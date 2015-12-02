'use strict';
/**
 * @ngdoc function
 * @name restaurantAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantAppApp
 */

var app = angular.module('starterApp');
  
app.controller('ResultCtrl', function ($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  console.log("ResultCtrl");
  console.log($route);
});