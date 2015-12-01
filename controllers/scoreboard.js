'use strict';

var app = angular.module('starterApp');

app.controller('GameCtrl', ['$scope', '$window', 'scoreboard', function($scope, $window, scoreboard) {
  console.log("RUN GAMECTRL");
  
  $scope.score = scoreboard.getScore();
  $scope.round = scoreboard.getRound();
  var self = $scope;
  self.time = 0;
  self.roundTime = 0;
}]);