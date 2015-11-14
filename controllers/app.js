'use strict';

angular
  .module('starterApp', [
    'ngMaterial','ngRoute'
  ])
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  });