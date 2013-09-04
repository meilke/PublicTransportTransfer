define(['services/services'],
  function (services) {
      services.factory('LocationService', ['$location', 
        function ($location) {

            return {
                
                goToPath: function (path) {
                    $location.search( 'preDestination', null);
                    $location.search( 'preLine', null);
                    $location.search( 'postDeparture', null);
                    $location.search( 'postLine', null);
                    $location.search( 'tranferHint', null);
                    $location.path(path);
                }
            };
        }]);
  });
