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

function calcRoute(start, end) {

  var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.TRANSIT
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      showRouteInMap(response);
      showTransfer(response);
    }
  });

}

function showRouteInMap(response) {
    directionsDisplay.setDirections(response);
}

function showTransfer(response) {

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

        var postTransferDeparture = postTransferStep.transit.departure_stop.name;
        var postTransferLine = postTransferStep.transit.line.short_name;

        queryObjects.push(
            {
                preDestination: preTransferDestination,
                postDeparture: postTransferDeparture,
                preLine: preTransferLine,
                postLine: postTransferLine
            }
        );
    }

    $.ajax({
        type: 'POST',
        url: "/rest/transfers/fullTransferQuery",
        data: {query: queryObjects}
    }).done(function(data) {
        // show transfer data
    });

}