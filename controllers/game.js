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
  // HARD
  ['#bfff80', '#ccff99'],
  ['#ffff99', '#ffffb3'], 
  // STARTER
  ['#fbe9e7', '#f8d7d3'], 
  ['#3399ff', '#007fff'],
  ['#669900', '#558000'],
  ['#99001a', '#993300'],
  ['#cfd8dc', '#b5c3c9'],
  ['#99ffcc', '#66ffb3'],
  ['#b3d9ff', '#99ccff'],
  ['#b3b3ff', '#ccccff'],
  ['#ff8080', '#ff9999'],
  ['#66ffcc', '#4dffc3'],
  // BLUE
  ['#006699', '#0077b3'], 
  ['#0099cc', '#00ace6'],
  ['#003399', '#002b80'],
  ['#336699', '#3973ac'],
  ['#003366', '#00264d'],
  ['#004466', '#00334d'],
  // GREEN
  ['#669999', '#5c8a8a'], 
  ['#39ac73', '#339966'],
  ['#d9f2e6', '#ecf9f2'],
  ['#2d862d', '#339933'],
  ['#004d00', '#006600'],
  ['#001a00', '#003300'],
  // RED
  ['#ff0066', '#e6005c'], 
  ['#ff4dd2', '#ff33cc'],
  ['#d633ff', '#e066ff'],
  ['#b82e8a', '#cc3399'],
  ['#cc6699', '#d279a6'],
  ['#cc0000', '#e60000'],
  ['#ff3300', '#ff5c33'], 
  ['#ff9933', '#ff8000'],
  ['#b35900', '#cc6600'],
  ['#4d1900', '#662200'],
  ['#cc0044', '#990033'],
  ['#33001a', '#4d0026']
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

// Opening dialog provide restruction and start game button
//function openingDialog($mdDialog) {
//  var confirm = $mdDialog.confirm()
//          .title('Title Here')
//          .textContent('Please select the color that is different than others. To get the best result, please take your time to pick the most right of box based on your judgement. Time is only the second factor.')
//          .ariaLabel('Lucky day')
//          .targetEvent(ev)
//          .ok('I Got it!');
//  $mdDialog.show(confirm).then(function() {
//    // Iterate every 300ms, non-stop
//    $interval(function() {
//      // Increment the Determinate loader
//      self.time += 1;
//      if (self.time > 100) {
//        self.time = 0;
//      }
//    }, 300, 0, true);
//  });
////    $scope.status = 'You decided to get rid of your debt.';
////  }, function() {
////    $scope.status = 'You decided to keep your debt.';
////  });
//}


app.controller('GameCtrl', ['$scope', '$window', '$interval', '$mdDialog', 'scoreboard', function($scope, $window, $interval, $mdDialog, scoreboard) {
  $scope.score = scoreboard.getScore();
  $scope.round = scoreboard.getRound();
  var self = $scope;
  self.time = 0;
  showAlert($mdDialog, function(){
    callback();
  });
  
  function showAlert($mdDialog, callback) {
  var alert = $mdDialog.alert({
    title: 'Attention',
    content: 'Please select the color that is different than others. To get the best result, please take your time to pick the most right of box based on your judgement. Time is only the second factor.',
    ok: 'I Got It!'
  });
  $mdDialog
    .show( alert )
    .finally(function() {
      alert = undefined;
      callback();
    });
  }
  
  function callback(){
    // Iterate every 300ms, non-stop
    $interval(function() {
      // Increment the Determinate loader
      self.time += 1;
      if (self.time > 100) {
        self.time = 0;
      }
    }, 300, 0, true);
  };
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
      $scope.$parent.round = scoreboard.getRound();
      //$scope.round = scoreboard.getRound();
      if (flag==1) {
        scoreboard.updateScore();
        $scope.$parent.score = scoreboard.getScore();
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
      var prevColor = ranColor;
      do {
        ranColor = randomPick(colorSet)
      } while (ranColor == prevColor);
//      ranColor = randomPick(colorSet);
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
