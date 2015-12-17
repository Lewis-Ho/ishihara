'use strict';
/**
 * @ngdoc function
 * @name restaurantAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantAppApp
 */

var app = angular.module('starterApp');

app.controller('ResultCtrl', function ($scope, $route, $routeParams, $location, $http, $cookies) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  console.log("ResultCtrl");
  console.log($routeParams);
  
  
  var request = $http.get('/Game/Result');
  request.success(function(data){
    console.log(data);
    console.log(data.length);
    
    
    var score = $cookies.get('_s');
    console.log("cookies: ");
    console.log(score);
    
    var total = 0;
    for(var i = 0; i < data.length; i ++){
      total = total + data[i].score;
    }

    //var average = JSON.parse('{ "average" : "' + total/data.length + '"}');
    var average = total/data.length;
    
    var margin = {top: 30, right: 10, bottom: 30, left: 50}
 
    var height = 400 - margin.top - margin.bottom,
        width = 200 - margin.left - margin.right,
        barWidth = 40,
        barOffset = 20;

    //average-bar-chart
    var aveChartData = [ score, average ];
    
//    function type(d) {
//      d.value = +d.value; // coerce to number
//      return d;
//    }
    ///
  });
  
});