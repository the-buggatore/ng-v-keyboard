'use strict';
angular.module('TestVirtualKeyboard',['ngRoute','angular-virtual-keyboard','TestVirtualKeyboard.pages']);

(function() {
  angular.module('TestVirtualKeyboard').config(['$routeProvider', configureRouting]);

  var ROUTES = [
    { url: '/', templateUrl: 'partials/keyboard.html'}
  ];


  function configureRouting($routeProvider) {

    $routeProvider.when('/', routeParams('partials/keyboard.html'));

    var option;

    _.each(ROUTES, function(route) {
      option = {
        templateUrl: route.templateUrl
      };

      if (_.has(route, 'controller')) {
        option.controller = route.controller;
      }

      if(_.has(route,"reloadOnSearch")){
        option.reloadOnSearch = route.reloadOnSearch;
      }
      $routeProvider.when(route.url, option);
    });

    $routeProvider.otherwise({redirectTo: '/'});

  }


  function routeParams(url, cfg, ctrl) {
    return {
      controller: ctrl || 'FrameController',
      resolve: {
        contentUrl: function() {
          return url;
        },
        config: function() {
          return cfg || {};
        }
      }
    };
  }

})();