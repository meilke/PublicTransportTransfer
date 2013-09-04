var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initializeMap(mapPlaceholder) {
  
  directionsService = new google.maps.DirectionsService();

  var manhattan = new google.maps.LatLng(40.7711329, -73.9741874);
  var mapOptions = {
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: manhattan
  }
  map = new google.maps.Map(mapPlaceholder, mapOptions);

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

}

function showRouteInMap(response) {
    directionsDisplay.setDirections(response);
}

function showTransfer(response, scope) {

    var steps = response.routes[0].legs[0].steps;
    var transitSteps = [];

    for (var i = 0; i < steps.length; i++) {
        if (steps[i].travel_mode == google.maps.TravelMode.TRANSIT) {
            transitSteps.push(steps[i]);
        }
    };

    if (transitSteps.length == 1)
        return;

    var queryObjects = [];

    for (var i = 0; i < transitSteps.length - 1; i++) {

        var preTransferStep = transitSteps[i];
        var postTransferStep = transitSteps[i + 1];

        var preTransferDestination = preTransferStep.transit.arrival_stop.name;
        var preTransferLine = preTransferStep.transit.line.short_name;
        var preTransferLineDirection = preTransferStep.transit.headsign;

        var postTransferDeparture = postTransferStep.transit.departure_stop.name;
        var postTransferLine = postTransferStep.transit.line.short_name;
        var postTransferLineDirection = postTransferStep.transit.headsign;

        queryObjects.push(
            {
                preDestination: preTransferDestination,
                postDeparture: postTransferDeparture,
                preLine: preTransferLine,
                preLineDirection: preTransferLineDirection,
                postLine: postTransferLine,
                postLineDirection: postTransferLineDirection
            }
        );
    }

    $.ajax({
        type: 'POST',
        url: "/rest/transfers/fullTransferQuery",
        data: {query: queryObjects}
    }).done(function(data) {
        scope.transfers = data;
    });

}

define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('SearchCtrl',
            ['$window', '$scope', function ($window, $scope) {

            		$scope.route = {
            			start: 'Muenchen Hauptbahnhof',
            			end: 'Muenchen Allianz Arena'
            		};

            		initializeMap(document.getElementById("map-canvas"));
                
                $scope.calcRoute = function() {
							  	var request = {
								      origin: $scope.route.start,
								      destination: $scope.route.end,
								      travelMode: google.maps.TravelMode.TRANSIT
								  };

								  directionsService.route(request, function(response, status) {
								    if (status == google.maps.DirectionsStatus.OK) {
								      showRouteInMap(response);
								      showTransfer(response, $scope);
								    }
								  });
							  };

            }]);
});
