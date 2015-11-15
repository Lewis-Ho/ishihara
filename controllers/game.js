'use strict';

/**
 * @ngdoc function
 * @name restaurantAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the 
 */

var app = angular.module('starterApp');

var colorSet = [
  ['#fbe9e7', '#ffccbc'], 
  ['#3399ff', '#3333ff'],
  ['#669900', '#1a9900'],
  ['#99001a', '#993300'],
  ['#cfd8dc', '#90a4ae'],
  ['#66ff66', '#66ffb3']
];

// button object
function box(id, flag, color){
  this.id = id;
  this.flag = flag;
  this.color = color;
};

// Return randomly picked element from an array
function randomPick (boxArray) {
  var rand = boxArray[Math.floor(Math.random() * boxArray.length)];
  return rand;
}

// Chunk array to two dimensional, nested array size based on input:size
function chunkArray(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}

// Resize button based on windows resolution
function resizeDiv(window, array) {
  return (window-(Math.sqrt(array.length)*25))/Math.sqrt(array.length);
}

app.controller('GameCtrl', ['$scope', '$window', 'scoreboard', function($scope, $window, scoreboard) {
//  $scope.score = scoreboard.getScore();
//  $scope.round = scoreboard.getRound();
}]);

app.controller('ScoreboardCtrl', ['$scope', '$window', 'scoreboard', function($scope, $window, scoreboard) {
  $scope.score = scoreboard.getScore();
  $scope.round = scoreboard.getRound();
}]);

app.controller('GameBoardCtrl', ['$scope', '$window', 'scoreboard', function($scope, $window, scoreboard) {
    // Init Setting
    var boxesSize = 2;
    var ranColor = randomPick(colorSet);
    var vpw = $window.innerWidth;
    var vph = $window.innerHeight;
    var btnSize = 0;
    $scope.boxes = [];
  
    for(var i=0; i<4; i++){
      var newBox = new box(i, 0, ranColor[0]);
      $scope.boxes.push(newBox);
    }
    // Randomly pick button and change flag
    var flagObj = randomPick($scope.boxes);
    flagObj.flag = 1;
    flagObj.color = ranColor[1];
    
    // Button size based on screen ratio, use screen widht if height is large, etc.
    if (vpw<vph){
      btnSize = resizeDiv(vpw, $scope.boxes);
    } else {
      btnSize = resizeDiv(vph, $scope.boxes);
    }
    $scope.btnWidth = btnSize+'px';
    // Chunk button array
    $scope.boxes = chunkArray($scope.boxes, Math.sqrt($scope.boxes.length));
  
    ///// NG-CLICK FUNCTION /////
    // Check current button's flag: if true, resize array; if false, size remain but change color set
    $scope.check = function(flag) {
      scoreboard.updateRound();
      $scope.round = scoreboard.getRound();
      if (flag==1) {
        scoreboard.updateScore();
        $scope.score = scoreboard.getScore();
        if (vpw<vph){
          if (vpw>((boxesSize+1)*52)){
            console.log("vpw");
            console.log(vpw+' ' +(boxesSize + 1)*52);
            boxesSize++;
          }
        } else {
          console.log("vph");
          if (vph>((boxesSize+1)*52)){
            console.log(vph+' ' +(boxesSize + 1)*52);
            boxesSize++;
          }
        }
      }
      
      console.log(vpw + ' ' + boxesSize);
      // Create new set of boxes, final boxesSize will be ^2 
      $scope.boxes = [];
      ranColor = randomPick(colorSet);
      for(var i=0; i<boxesSize; i++){
        for(var j=0; j<boxesSize; j++){
          var newBox = new box($scope.boxes.length, 0, ranColor[0]);
          $scope.boxes.push(newBox);
        }
      }
      // Pick one button and change its flag
      var flagObj = randomPick($scope.boxes);
      flagObj.flag = 1;
      flagObj.color = ranColor[1];
      
      // Button size based on screen ratio, use screen widht if height is large, etc.
      if (vpw<vph){
        btnSize = resizeDiv(vpw, $scope.boxes);
      } else {
        btnSize = resizeDiv(vph, $scope.boxes);
      }
      $scope.btnWidth = btnSize+'px';

      // Chunk button array
      $scope.boxes = chunkArray($scope.boxes, Math.sqrt($scope.boxes.length));
    };
  }]);

// Factory //
app.factory('scoreboard', function(){
  var service = {};
  var _score = 0;
  var _history = 'high score';
  var _round = 0;
  
  service.getScore = function(){
    return _score;
  }
  service.updateScore = function(){
    _score = _score + 1;
    console.log(_score);
  }
  service.getRound = function(){
    return _round;
  }
  service.updateRound = function(){
    _round = _round + 1;
  }
  service.setHistory = function(history){
    _hostory = history;
  }
  service.getHistory = function(){
    return _hostory;
  }
  
  return service;
})

  
    // Functions
    //game.boxes = [{1},{1},{1},{1}];
  
////    game.todos = [
////      {text:'learn angular', done:true},
////      {text:'build an angular app', done:false}];
////
////    game.addTodo = function() {
////      game.todos.push({text:game.todoText, done:false});
////      game.todoText = '';
////    };
////
////    game.remaining = function() {
////      var count = 0;
////      angular.forEach(game.todos, function(todo) {
////        count += todo.done ? 0 : 1;
////      });
////      return num;
////    };
////
////    game.archive = function() {
////      var oldTodos = game.todos;
////      game.todos = [];
////      angular.forEach(oldTodos, function(todo) {
////        if (!todo.done) game.todos.push(todo);
////      });
////    };
//  });
