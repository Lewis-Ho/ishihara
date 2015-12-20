'use strict';

angular
  .module('starterApp', [
    'ngMaterial','ngRoute','ngCookies', 'ui.router','chart.js'
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
//       'tr', 'tg', 'tb', 'hr', 'hg', 'hb'
//      ],
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
      responsive : true,
      segmentShowStroke : false,
      segmentStrokeColor : "#fff",
      segmentStrokeWidth : 2,
      animationSteps : 120,
      animationEasing : "easeOutBounce",
      animateRotate : true,
      animateScale : true
    });
  }]);
