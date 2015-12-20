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
//  $scope.countNumOne = 0;
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
//    canvas.width = vpw*.1;
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
    var offSet = vpw*0.2*2;
    console.log(vpw);
    //var barCanvas = angular.element( document.querySelector( '#bar' ) ); 
    var ctx=document.getElementById("bar").getContext("2d");
    ctx.canvas.width = vpw - offSet;
//    ctx.canvas.height = (vpw - offSet)*2;
//    barCanvas.clientWidth = vpw - offSet;
//    barCanvas.clientHeight =  (vpw - offSet)*2;
    
    if (vpw < vph){
      // Mobile View
    } else {
      // Desktop View
    }
    
    //TESTING VARIABLE
    var color = ["red", "blue", "green"];
    var numberOfCorrect = [6, 5, 4];
    var TolalColorGuess = [8, 7, 5];
    var total = 20;
    
    $scope.pie1 = numberOfCorrect[0];
    $scope.pie2 = numberOfCorrect[1];
    $scope.pie3 = numberOfCorrect[2];
    
    for(var i = 0; i <3; i++){
//      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
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
app.controller("pieOneCtrl", function ($scope, $window, $http, $cookies, $stateParams, $document) {
    var request = $http.get('/Game/Result');
    request.success(function(d){
      var rating = Math.round(($cookies.get('_hr') / $cookies.get('_tr'))*100);
      $scope.labels = ['Hit','Miss'];
      $scope.data = [rating,100-rating];
      $scope.colours = ['#F44336','#DCDCDC'];
      $scope.countNumOne = rating;
      //var ctx = ($element).get(0).getContext("2d");
      var myElement = angular.element(document.querySelector('#doughnut'))
      var canvasWidthvar = myElement.clientWidth;
      var canvasHeight = myElement.clientHeight;
      //this constant base on canvasHeight / 2.8em
      var constant = 114;
      var fontsize = (canvasHeight/constant).toFixed(2);
//      ctx.font=fontsize +"em Verdana";
//      ctx.textBaseline="middle"; 
//      var total = 0;
//      $.each(doughnutData,function() {
//        total += parseInt(this.value,10);
//      });
//      var tpercentage = ((doughnutData[0].value/total)*100).toFixed(2)+"%";
//      var textWidth = ctx.measureText(tpercentage).width;
//
//      var txtPosx = Math.round((canvasWidthvar - textWidth)/2);
//      ctx.fillText(tpercentage, txtPosx, canvasHeight/2);
      
      
    });
  });

// Green Doughnut Chart
app.controller("pieTwoCtrl", function ($scope, $window, $http, $cookies) {
    var request = $http.get('/Game/Result');
    request.success(function(d){
      var rating = Math.round(($cookies.get('_hg') / $cookies.get('_tg'))*100);
      console.log($cookies.get('_hg'));
      $scope.labels = ['Hit','Miss'];
      $scope.data = [rating,100-rating];
      $scope.colours = ['#4CAF50','#DCDCDC',];
      $scope.countNumTwo = rating;
    });
  });

// Blue Doughnut Chart
app.controller("pieThreeCtrl", function ($scope, $window, $http, $cookies) {
    var request = $http.get('/Game/Result');
    request.success(function(d){
      var rating = Math.round(($cookies.get('_hb') / $cookies.get('_tb'))*100);
      $scope.labels = ['Hit','Miss'];
      $scope.data = [rating,100-rating];
      $scope.colours = ['#03A9F4 ','#DCDCDC'];
      $scope.countNumThree = rating;
    });
  });


app.controller("resizeCtrl", function ($scope, $window, $http, $cookies) {
    var request = $http.get('/Game/Result');
    request.success(function(data){
    
      var score = $cookies.get('_s');
      var total = 0;
      for(var i = 0; i < data.length; i ++){
        total = total + data[i].score;
      }

      //var average = JSON.parse('{ "average" : "' + total/data.length + '"}');
      var average = total/data.length;

      //average-bar-chart
      var aveChartData = [ score, average ];
      
      
      
      $scope.labels = ['Your Score VS Population Score'];
      $scope.series = ['Your Score', 'Population Average'];

      $scope.data = [
        [aveChartData[0]],
        [aveChartData[1]]
      ];
    });
  });