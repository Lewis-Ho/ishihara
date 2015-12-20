'use strict';
/**
 * @ngdoc function
 * @name restaurantAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantAppApp
 */

var app = angular.module('starterApp');

app.controller('ResultCtrl', function ($scope, $route, $routeParams, $location, $http, $cookies, $window, $stateParams) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  console.log("ResultCtrl");
//  console.log($routeParams);
  console.log($stateParams);
  
  // Resize charts canvas
  var w = angular.element($window);
  w.bind('resize', function () {
    console.log('resize');
    var vpw = $window.innerWidth;
    var vph = $window.innerHeight;
    console.log(vpw + " " + vph);
    var canvas = document.getElementsByClassName("chart");  
    canvas.width = vpw*.28;
  });
  
  var request = $http.get('/Game/Result');
  request.success(function(data){
    console.log(data);
//    console.log(data.length);
    
    
    var score = $cookies.get('_s');
    console.log("cookies: ");
    console.log(score);
    var vpw = $window.innerWidth;
    var vph = $window.innerHeight;
    console.log(vpw);
    
    
//    var data = [
//        {
//            value: 300,
//            color:"#F7464A",
//            highlight: "#FF5A5E",
//            label: "Red"
//        },
//        {
//            value: 50,
//            color: "#46BFBD",
//            highlight: "#5AD3D1",
//            label: "Green"
//        },
//        {
//            value: 100,
//            color: "#FDB45C",
//            highlight: "#FFC870",
//            label: "Yellow"
//        }
//    ]
    //TESTING VARIABLE
    var color = ["red", "blue", "green"];
    var numberOfCorrect = [6, 5, 4];
    var TolalColorGuess = [8, 7, 5];
    var total = 20;
    
    $scope.pie1 = numberOfCorrect[0];
    $scope.pie2 = numberOfCorrect[1];
    $scope.pie3 = numberOfCorrect[2];
//    $scope.pies = [
//      { data: 6, label: "First content" },
//      { data: 5, label: "First content" },
//      { data: 4, label: "Second content" }
//    ];

    
    for(var i = 0; i <3; i++){
      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      //$scope.data = [6, 5, 4];
      $scope.pieOne = [6];
      $scope.pie2 = numberOfCorrect[1];
      $scope.pie3 = numberOfCorrect[2];
//      var c = document.getElementById("doughnut");
//      if()
//      c.width = width;
//      var myNewChart = new Chart(ctx[i]).Doughnut(data, {
//        responsive : true,
//        segmentShowStroke : true,
//        segmentStrokeColor : "#fff",
//        segmentStrokeWidth : 2,
//        animationSteps : 300,
//        animationEasing : "easeOutBounce",
//        animateRotate : true,
//        animateScale : true
//      });
    }
    
    
//    //Get the canvas &
//    var c = document.getElementById('#chart-canvas').getContext('2d');
////    var ct = c.get(0).getContext('2d');
//    var container = $(c).parent();
//
//    //Run function when browser resizes
//    $window.resize( respondCanvas );
//
//    function respondCanvas(){ 
//        c.attr('width', $(container).width() ); //max width
//        c.attr('height', $(container).height() ); //max height
//
//        //Call a function to redraw other content (texts, images etc)
//    }
//
//    //Initial call 
//    respondCanvas();
    
    
    
    var total = 0;
    for(var i = 0; i < data.length; i ++){
      total = total + data[i].score;
    }

    //var average = JSON.parse('{ "average" : "' + total/data.length + '"}');
    var average = total/data.length;

    //average-bar-chart
    var aveChartData = [ score, average ];
    
//    var favoriteCookie = $cookies.get('_s');
    console.log($cookies.get('_s'));
    console.log($cookies.get('_t'));
    console.log($cookies.get('_h'));
//    function type(d) {
//      d.value = +d.value; // coerce to number
//      return d;
//    }
    ///
  });
});


// Red Doughnut Chart
app.controller("pieOneCtrl", function ($scope, $window, $http, $cookies, $stateParams) {
    var request = $http.get('/Game/Result');
    request.success(function(d){
      var rating = Math.round(($cookies.get('_hr') / $cookies.get('_tr'))*100);
      $scope.labels = ['Hit', 'Miss'];
      $scope.data = [100-rating,rating];
      $scope.colours = ['#F44336 ','#DCDCDC'];
    });
  });

// Green Doughnut Chart
app.controller("pieTwoCtrl", function ($scope, $window, $http, $cookies) {
    var request = $http.get('/Game/Result');
    request.success(function(d){
      var rating = Math.round(($cookies.get('_hg') / $cookies.get('_tg'))*100);
      console.log($cookies.get('_hg'));
      $scope.labels = ['Hit', 'Miss'];
      $scope.data = [100-rating,rating];
      $scope.colours = ['#4CAF50 ','#DCDCDC'];
    });
  });

// Blue Doughnut Chart
app.controller("pieThreeCtrl", function ($scope, $window, $http, $cookies) {
    var request = $http.get('/Game/Result');
    request.success(function(d){
      var rating = Math.round(($cookies.get('_hb') / $cookies.get('_tb'))*100);
      $scope.labels = ['Hit', 'Miss'];
      $scope.data = [100-rating,rating];
      $scope.colours = ['#03A9F4 ','#DCDCDC'];
    });
  });


app.controller("resizeCtrl", function ($scope, $window, $http) {
    var request = $http.get('/Game/Result');
    request.success(function(data){
      $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      $scope.series = ['Series A', 'Series B'];

      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
    });
  });