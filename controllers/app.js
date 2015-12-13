'use strict';

angular
  .module('starterApp', [
    'ngMaterial','ngRoute','ngCookies'
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
        controllerAs: 'game'
      })
      .otherwise({
        redirectTo: '/'
      });
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .warnPalette('blue-grey', {
        'default': '300'
      });
  });