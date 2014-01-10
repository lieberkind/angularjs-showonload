var app = angular.module('showOnLoadTest', ['showOnLoad']);

app.controller('AppCtrl', ['$scope', '$http', '$timeout', 'SOLLoader', function($scope, $http, $timeout, SOLLoader) {
  
  $scope.httpRequest = function() {
    SOLLoader.showOnRequestSuccess();
    $http.get('data.php').then(function() {
      console.log('Request finished!');
      console.log('Processing response...')
      $timeout(function() {
        console.log('Processing done!');
        SOLLoader.hide();
      }, 2000);
    });
  }

  $scope.nonHttpRequest = function() {
    SOLLoader.show();
    $timeout(function() {
      console.log('I\'m not an http request');
      SOLLoader.hide();
    }, 1500);
  }

  $scope.disabledRequest = function() {
    console.log('Disabling loader...');
    SOLLoader.disableOnHttp();
    console.log('Disabled!');
    console.log('Sending request...');
    $http.get('data.php').then(function() {
      console.log('Request finished!');
      console.log('Reenabling loader...');
      SOLLoader.enableOnHttp();
      console.log('Enabled!');
    });
  }

}]);