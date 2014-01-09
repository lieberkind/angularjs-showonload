var app = angular.module('showOnLoad', []);

app.factory('SOLLoader', function() {

  var api = {
    status: {
      visible: false
    },

    show: function() {
      api.status.visible = true;
    },

    hide: function() {
      api.status.visible = false;
    }
  }

  return api;
});

app.directive('showOnLoad', ['SOLLoader', function(SOLLoader) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, element, attrs) {
      scope.status = SOLLoader.status;

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
  $httpProvider.interceptors.push(['$q', 'SOLLoader', function($q, SOLLoader) {
    return {
      request: function(config) {
        SOLLoader.status.visible = true;
        return config || $q.when(config);
      },

      requestError: function() {
        SOLLoader.status.visible = false;
      },

      response: function(response) {
        SOLLoader.status.visible = false;
        return response || $q.when(response);
      },

      responseError: function(response) {
        SOLLoader.status.visible = false;
      }
    }
  }]);
}]);