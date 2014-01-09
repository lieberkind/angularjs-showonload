var app = angular.module('showOnLoadTest', ['showOnLoad']);

app.controller('AppCtrl', ['$scope', '$http', '$timeout', 'SOLLoader', function($scope, $http, $timeout, SOLLoader) {
  
  $scope.httpRequest = function() {
    $http.get('data.php');
  }

  $scope.nonHttpRequest = function() {
    SOLLoader.show();
    $timeout(function() {
      console.log('I\'m not an http request');
      SOLLoader.hide();
    }, 1500);
  }

}]);