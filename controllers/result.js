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
  
//  var x = d3.scale.linear()
//    .domain([0, d3.max(data)])
//    .range([0, 420]);
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
    console.log(data.length);
    
    
    var score = $cookies.get('_s');
    console.log("cookies: ");
    console.log(score);
    
    ///Test
//    d3.select(".container").append("div").attr("class", "chart").selectAll("p")
//    .data(data)
//    .enter().append("div")
//    .style("width", function(d) { return d.score + "%"; })
//    .text(function(d) { return d.score + "%"; });
    ///
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
    
    var yScale = d3.scale.linear()
        .domain([0, d3.max(aveChartData)])
        .range([0, height])

    var xScale = d3.scale.ordinal()
        .domain(d3.range(0, aveChartData.length))
        .rangeBands([0, width])
 
    var p = d3.select('#average-bar-chart').append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
              .append('g')
              .attr('transform', 'translate(' + (margin.left + 30) + ', ' + margin.top + ')')
              .selectAll('rect')
              .data(aveChartData)
              .enter()
              .append('rect')
              .style({'fill': '#3c763d', 'stroke': '#d6e9c6'})
              .attr('width', barWidth)
              .attr('height', function (data) {
                return data;
              })
              .attr('x', function (data, i) {
                return i * (barWidth + barOffset);
              })
              .attr('y', function (data) {
                return height - data;
              })
              .text(function (d,i) {
                if (i=0){
                  return "Your Score: " + d;
                } else {
                  return "Population Average: " + d;
                }
              });

    // Transition
    p.transition()
      .attr('height', function (data) {
          return yScale(data);
      })
      .attr('y', function (data) {
          return height - yScale(data);
      })
      .delay(function (data, i) {
          return i * 20;
      })
      .duration(2000)
      .ease('elastic');
    
    // Adding Horizontal and Vertical Guides
    var verticalGuideScale = d3.scale.linear()
                              .domain([0, d3.max(aveChartData)])
                              .range([height, 0])
 
    var vAxis = d3.svg.axis()
        .scale(verticalGuideScale)
        .orient('left')
        .ticks(10)

    var verticalGuide = d3.select('svg').append('g')
    vAxis(verticalGuide)
    verticalGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    verticalGuide.selectAll('path')
        .style({fill: 'none', stroke: "#3c763d"})
    verticalGuide.selectAll('line')
        .style({stroke: "#3c763d"})

    var hAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(aveChartData.size)

    var horizontalGuide = d3.select('svg').append('g')
    hAxis(horizontalGuide)
    horizontalGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
    horizontalGuide.selectAll('path')
        .style({fill: 'none', stroke: "#3c763d"})
    horizontalGuide.selectAll('line')
        .style({stroke: "#3c763d"});
    ///
    // END


    var bar = d3.select('#bar-chart').append('svg')
                .attr('width', width)
                .attr('height', height)
                .selectAll('rect').data(data)
                .enter().append('rect')
                .style({'fill': '#3c763d', 'stroke': '#d6e9c6'})
                .attr('width', barWidth)
                .attr('height', function (data) {
                    return data.score;
                })
                .attr('x', function (data, i) {
                    return i * (barWidth + barOffset);
                })
                .attr('y', function (data) {
                    return height - data.score;
                });

//                       .attr("cx", 50)
//                       .attr("cy", 50)
//                       .attr("r", function (d) { return d; })
//                       .style("fill", "green");

//    function type(d) {
//      d.value = +d.value; // coerce to number
//      return d;
//    }
    ///
  });
  
});