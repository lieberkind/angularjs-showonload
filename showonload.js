var app = angular.module('showOnLoad', []);

app.factory('SOLService', function() {

  var api = {
    status: {
      visible: false
    }
  }

  return api;
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
  // Register the interceptor as an anonymous service as to not
  // expose it to the public
  $httpProvider.interceptors.push(['$q', 'SOLService', function($q, SOLService) {
    return {
      request: function(config) {
        SOLService.status.visible = true;
        return config || $q.when(config);
      },

      requestError: function() {
        SOLService.status.visible = false;
      },

      response: function(response) {
        SOLService.status.visible = false;
        return response || $q.when(response);
      },

      responseError: function(response) {
        SOLService.status.visible = false;
      }
    }
  }]);
}]);