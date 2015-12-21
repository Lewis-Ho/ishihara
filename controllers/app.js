'use strict';

angular
  .module('starterApp', [
    'ngMaterial','ngRoute','ngCookies', 'ui.router','chart.js','countTo'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/start.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/Game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
      })
      .when('/Game/Result', {
        templateUrl: 'views/result.html',
        controller: 'ResultCtrl',
        controllerAs: 'game',
      })
      .otherwise({
        redirectTo: '/'
      });
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .warnPalette('blue-grey', {
        'default': '400'
      });
  })
.config(function($stateProvider) {    
  $stateProvider
    .state('result', {
      url: '/Game/Result',
      templateUrl: 'views/result.html',
      params: {
        'tr': 'some default', 
        'tg': 'some default', 
        'tb': 'some default',
        'hr': 'some default', 
        'hg': 'some default', 
        'hb': 'some default'
      }
    })
//    .state('game', {
//      url: '/Game',
//      templateUrl: 'views/game.html',
//      controller: 'GameCtrl',
//      controllerAs: 'game'
//    })
    .state('game', {
      url: '/Game',
      templateUrl: 'views/start.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
})
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
//      colours: ['#FF5252', '#FF8A80'],
      responsive: true,
      showScale: true
    });
    // Configure all line charts
//    ChartJsProvider.setOptions('Line', {
//      datasetFill: false
//    });
    ChartJsProvider.setOptions('Doughnut', {
      segmentShowStroke : false,
//      segmentStrokeColor : "#fff",
//      segmentStrokeWidth : 2,
      animationSteps : 100,
//      animationEasing : "easeOutBounce",
      animateRotate : true,
      animateScale : true,
      showTooltips: false,
      percentageInnerCutout : 70,
      onAnimationComplete: function() {
//        var canvasWidthvar = $('#doughnut').width();
//        var canvasHeight = $('#doughnut').height();
//        //this constant base on canvasHeight / 2.8em
//        var constant = 114;
//        var fontsize = (canvasHeight/constant).toFixed(2);
//        ctx.font=fontsize +"em Verdana";
//       ctx.textBaseline="middle"; 
//       var total = 0;
//       $.each(doughnutData,function() {
//         total += parseInt(this.value,10);
//     });
//    var tpercentage = ((doughnutData[0].value/total)*100).toFixed(2)+"%";
//    var textWidth = ctx.measureText(tpercentage).width;
//
//     var txtPosx = Math.round((canvasWidthvar - textWidth)/2);
//      ctx.fillText(tpercentage, txtPosx, canvasHeight/2);
    }
    });
    ChartJsProvider.setOptions('Bar', {
//      segmentShowStroke : false,
////      segmentStrokeColor : "#fff",
////      segmentStrokeWidth : 2,
//      animationSteps : 100,
////      animationEasing : "easeOutBounce",
//      animateRotate : true,
//      animateScale : true,
//      showTooltips: false,
//      barValueSpacing : 100,
//      barDatasetSpacing : 40
  });
}]);
