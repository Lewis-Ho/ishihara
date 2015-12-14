'use strict';
/**
 * @ngdoc function
 * @name restaurantAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurantAppApp
 */

var app = angular.module('starterApp');

app.controller('ResultCtrl', function ($scope, $route, $routeParams, $location, $http, $cookies, $window) {
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
    var vpw = $window.innerWidth;
    var vph = $window.innerHeight;
    console.log(vpw);
    
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
 
    if (vpw > vph){
      // Desktop
      var height = vph/1.5 - margin.top - margin.bottom,
        width = vpw/4 - margin.left,
        barWidth = 60,
        barOffset = vph/6;
    } else {
      // Mobile
      var height = vph/1.5 - margin.top - margin.bottom,
        width = vpw/1.5 - margin.left,
        barWidth = 60,
        barOffset = vph/11;
    }

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
              .style({'fill': 'rgb(96,125,139)', 'stroke': '#d6e9c6'})
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
    verticalGuide.selectAll('path').style({fill: 'none', stroke: "rgb(96,125,139)"})
    verticalGuide.selectAll('line').style({stroke: "rgb(96,125,139)"})

    var hAxis = d3.svg.axis()
                  .scale(xScale)
                  .tickFormat(function(d,i) { 
                    if (i == 0)
                      return 'Your Score';
                    else
                      return 'Average Score';
                  })
                  .orient('bottom')

    var horizontalGuide = d3.select('svg').append('g')
    hAxis(horizontalGuide)
    horizontalGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
    horizontalGuide.selectAll('path').style({fill: 'none', stroke: "#3c763d"})
    horizontalGuide.selectAll('line').style({stroke: "#3c763d"});
    
//    var bar = d3.select('#bar-chart').append('svg')
//                .attr('width', width)
//                .attr('height', height)
//                .selectAll('rect').data(data)
//                .enter().append('rect')
//                .style({'fill': 'rgb(96,125,139)', 'stroke': 'rgb(96,125,139)'})
//                .attr('width', barWidth)
//                .attr('height', function (data) {
//                    return data.score;
//                })
//                .attr('x', function (data, i) {
//                    return i * (barWidth + barOffset);
//                })
//                .attr('y', function (data) {
//                    return height - data.score;
//                });
    // Circle ---
    var width = 960,
    height = 500,
    twoPi = 2 * Math.PI,
    progress = 0,
    total = 1308573, // must be hard-coded if server doesn't report Content-Length
    formatPercent = d3.format(".0%");
    
    var arc = d3.svg.arc()
        .startAngle(0)
        .innerRadius(18)
        .outerRadius(24);

    var svg = d3.select("#circular").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var meter = svg.append("g")
        .attr("class", "progress-meter");

    meter.append("path")
        .attr("class", "background")
        .attr("d", arc.endAngle(twoPi));

    var foreground = meter.append("path")
        .attr("class", "foreground");

    var text = meter.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em");

  });
  
});