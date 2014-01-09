var app = angular.module('showOnLoad', []);

app.factory('SOLInterceptor', ['SOLService', function(SOLService) {
  return {
    request: function(config) {
      SOLService.status.visible = true;
      return config;
    },

    requestError: function() {
      SOLService.status.visible = false;
    },

    response: function(response) {
      SOLService.status.visible = false;
      return response;
    },

    responseError: function(response) {
      SOLService.status.visible = false;
    }
  }
}]);

app.factory('SOLService', function() {
  return {
    status: {
      visible: false
    }
  }
});

app.directive('showOnLoad', ['SOLService', function(SOLService) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      scope.status = SOLService.status;

      scope.$watch('status.visible', function() {
        var val = scope.status.visible ? 'block' : 'none';
        element.css({'display': val});
      });
    }
  }
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('SOLInterceptor');
}]);