var app = angular.module('showOnLoadTest', ['showOnLoad']);

app.controller('AppCtrl', ['$scope', '$http', '$timeout','SOLService', function($scope, $http, $timeout, SOLService) {
  
  $scope.httpRequest = function() {
    $http.get('data.php');
  }

  $scope.nonHttpRequest = function() {
    SOLService.status.visible = true;
    $timeout(function() {
      console.log('I\'m not an http request');
      SOLService.status.visible = false;
    }, 1500);
  }

}]);