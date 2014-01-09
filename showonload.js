var app = angular.module('showOnLoad', []);

app.factory('SOLLoader', function() {

  var showOnRequestSuccess = false;

  var api = {
    status: {
      visible: false
    },

    showOnRequestSuccess: function() {
      showOnRequestSuccess = true;
    },

    shouldShowOnRequestSuccess: function() {
      return showOnRequestSuccess;
    },

    show: function() {
      api.status.visible = true;
    },

    hide: function() {
      showOnRequestSuccess = true;  
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
        SOLLoader.show();
        return config || $q.when(config);
      },

      requestError: function() {
        SOLLoader.hide();
      },

      response: function(response) {
        if(!SOLLoader.shouldShowOnRequestSuccess) {
          SOLLoader.hide();
        }

        return response || $q.when(response);
      },

      responseError: function(response) {
        SOLLoader.hide();
      }
    }
  }]);
}]);