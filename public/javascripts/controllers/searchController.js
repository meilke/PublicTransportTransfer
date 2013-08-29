define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('SearchCtrl',
            ['$window', '$scope', function ($window, $scope) {

                initializeMap(document.getElementById("map-canvas"));
                $( "#calc-button" ).click(function() {
                  calcRoute(document.getElementById("from-input").value, document.getElementById("to-input").value);
                });

            }]);
});
