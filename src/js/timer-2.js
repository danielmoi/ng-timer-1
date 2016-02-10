var app = angular.module('myApp', []);

app.controller('myController', ['$scope', function ($scope) {

  var self = this,
    referenceTime,

    input_pomo_min = 0.2,
    input_break_min = 0.3,



    initial_ms_pomo,
    initial_ms_break,

    remaining_ms_pomo,
    remaining_ms_break,

    initial_ms,
    current_ms,
    remaining_ms,


    remaining_percent = 1,
    display = document.getElementById('timer1'),
    circle = $('#circle1'),
    maxOffset = 500,
    display_min,
    display_sec,
    intervalID = false,
    session = 'pomo',
    running = 0,
    fresh = 1;

  $scope.input_pomo_min = 1;
  $scope.input_break_min = 0.3;

  //  $scope.initial_ms_pomo = $scope.input_pomo_min * 1000 * 60;
  //  $scope.initial_ms_break = $scope.input_break_min * 1000 * 60;

  $scope.$watch('input_pomo_min', function (value) {
    $scope.initial_ms_pomo = value * 1000 * 60;
  });

  $scope.$watch('input_break_min', function (value) {
    $scope.initial_ms_break = value * 1000 * 60;
  });

  $scope.initial_ms = $scope.input_pomo_min * 1000 * 60;
  $scope.current_ms = '';
  $scope.remaining_ms = $scope.input_pomo_min * 1000 * 60;

  $scope.$watch('remaining_ms', function (value) {

    display_min = Math.floor(value / 60000);
    display_sec = Math.floor(value / 1000) % 60;
    display_min = display_min < 10 ? '0' + display_min : display_min;
    display_sec = display_sec < 10 ? '0' + display_sec : display_sec;
    $scope.displayable_time = display_min + ':' + display_sec;
    console.log($scope.displayable_time);

  });
  $scope.start = function () {
    if (running === 0) {
      referenceTime = Date.now();
      running = 1;
      if (fresh === 1) {
        fresh = 0;
        if (session === 'pomo') {
          console.log('starting new POMO!');
          $scope.initial_ms = $scope.initial_ms_pomo;
          $scope.current_ms = $scope.initial_ms_pomo;
        }
        if (session === 'break') {
          console.log('starting new BREAK!');
          $scope.initial_ms = $scope.initial_ms_break;
          $scope.current_ms = $scope.initial_ms_break;
        }
      }

      intervalID = setInterval(function () {
        var checkTime = Date.now(),
          actualInterval = checkTime - referenceTime;
        $scope.remaining_ms = $scope.current_ms - actualInterval;
        console.log(session + ': ' + $scope.remaining_ms);
        console.log($scope.displayable_time);
        $scope.$digest();
        //        $scope.displayable_time_2();

        //        $scope.$apply(function () {
        //          $scope.convert_ms($scope.current_ms);
        //        });

        if ($scope.remaining_ms <= 0) {
          $scope.stop();
          $scope.finished();
        }
      }, 1000);
    }
  };


  $scope.stop = function () {
    if (running === 1) {
      running = 0;
      $scope.current_ms = $scope.remaining_ms;
      clearInterval(intervalID);
    }
    console.log('stop, intervalID: ' + intervalID);
  };

  $scope.finished = function () {
    console.log('finished, interval: ' + intervalID);

    running = 0;
    fresh = 1;
    if (session === 'pomo') {
      console.log('assigning BREAK');

      session = 'break';
      return $scope.start();
    }
    if (session === 'break') {
      console.log('assigning POMO');

      session = 'pomo';
      return $scope.start();
    }
    console.log('this should not be seen in console!');
  };


  $scope.reset = function () {
    running = 0;
    fresh = 1;
    clearInterval(intervalID);
    console.log($scope.initial_ms);
    $scope.current_ms = $scope.initial_ms;
    $scope.remaining_ms = $scope.initial_ms;


    console.log('reset, intervalID: ' + intervalID);




  };


  $scope.pomo_add = function () {
    if ($scope.input_pomo_min < 60) {
      $scope.input_pomo_min += 1;
    }
  };

  $scope.pomo_minus = function () {
    if ($scope.input_pomo_min > 1) {
      $scope.input_pomo_min -= 1;
    }
  };

  $scope.break_add = function () {
    if ($scope.input_break_min < 60) {
      $scope.input_break_min += 1;
    }
  };

  $scope.break_minus = function () {
    if ($scope.input_break_min > 1) {
      $scope.input_break_min -= 1;
    }
  };








}]);