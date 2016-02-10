// Code goes here
// http://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-AngularJS
// http://tutorials.jenkov.com/angularjs/watch-digest-apply.html


var watchTest = angular.module('WatchTest', []);

watchTest.controller('watchTestCtrl-1', ['$scope', function ($scope) {
  $scope.title = "Hello AngularJS";

  $scope.firstName = "Jeffry";
  $scope.lastName = "Houser";

  $scope.onReset = function () {
    $scope.firstName = "";
    $scope.lastName = "";
  }


  $scope.$watch('firstName',
    function (newValue, oldValue) {
      console.log('firstName Changed');
      console.log(newValue);
      console.log(oldValue);
    }
  );

  $scope.$watch('lastName',
    function (newValue, oldValue) {
      console.log('lastName Changed');
      console.log(newValue);
      console.log(oldValue);
    }
  );

  $scope.triggerChange = function () {
    setTimeout(function () {
      console.log('First name being reset');
      $scope.firstName = '';
    }, 1000);
  };

  $scope.logName = function () {
    console.log($scope.firstName);
    console.log($scope.lastName);
  }
}]);

watchTest.controller('watchTestCtrl-2', ['$scope', function ($scope) {
  $scope.title = "Hello AngularJS";

  $scope.firstName = "Jeffry";
  $scope.lastName = "Houser";

  $scope.onReset = function () {
    $scope.firstName = "";
    $scope.lastName = "";
  }


  $scope.$watch('firstName',
    function (newValue, oldValue) {
      console.log('firstName Changed');
      console.log(newValue);
      console.log(oldValue);
    }
  );

  $scope.$watch('lastName',
    function (newValue, oldValue) {
      console.log('lastName Changed');
      console.log(newValue);
      console.log(oldValue);
    }
  );

  $scope.triggerChangeWithApply = function () {
    setTimeout(function () {
      console.log('First name being reset');
      $scope.$apply(function () {
        $scope.firstName = ''
      })
    }, 1000);
  };

  $scope.logName = function () {
    console.log($scope.firstName);
    console.log($scope.lastName);
  }
}]);