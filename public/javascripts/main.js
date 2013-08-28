require.config({
    paths: {
        angular: 'angular.min',
        jqueryUI: 'jquery-ui',
        jqueryColorbox: 'jquery-colorbox',
        jquery: 'jquery',
        domReady: 'domReady',
        maps: 'maps',
        reactive: 'rx'
    },
    shim: {
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
    'domReady',
    'jquery',
    'maps'
  ],
  function (domReady, jquery, maps) {
      'use strict';

      domReady(function () {
        initializeMap(document.getElementById("map-canvas"));
        $( "#calc-button" ).click(function() {
          calcRoute(document.getElementById("from-input").value, document.getElementById("to-input").value);
        });
      });
  }
);
