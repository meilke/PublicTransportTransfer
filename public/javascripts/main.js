require.config({
    paths: {
        angular: 'angular.min',
        angularresource: 'angular-resource.min',
        jqueryUI: 'jquery-ui',
        jqueryColorbox: 'jquery-colorbox',
        jquery: 'jquery',
        domReady: 'domReady'
    },
    shim: {
        angularresource: {
            deps: ['angular'],
            exports: 'angularresource'
        },
        angular: {
            deps: ['jquery', 'jqueryUI', 'jqueryColorbox'],
            exports: 'angular'
        },
        jqueryUI: {
            deps: ['jquery']
        },
        jqueryColorbox: {
            deps: ['jquery']
        }
    }
});

require([
    'angular',
    'angularresource',
    'ptt',
    'domReady',
    'jquery',
    'services/locationService',
    'services/transferService',
    'controllers/searchController',
    'controllers/addController',
    'controllers/editController',
    'controllers/listController'
  ],
  function (angular, angularresource, ptt, domReady, jquery) {
      'use strict';

      ptt.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'search.html',
                    controller: 'SearchCtrl'
                })
                .when('/add', {
                    templateUrl: 'edit.html',
                    controller: 'AddCtrl'
                })
                .when('/edit/:transferId', {
                    templateUrl: 'edit.html',
                    controller: 'EditCtrl'
                })
                .when('/list', {
                    templateUrl: 'list.html',
                    controller: 'ListCtrl'
                })
                .otherwise({ redirectTo: '/' });;
        }
      ]);

      domReady(function () {
        angular.bootstrap(document, ['PTT']);
        $('html').addClass('ng-app: PTT');
      });
  }
);
