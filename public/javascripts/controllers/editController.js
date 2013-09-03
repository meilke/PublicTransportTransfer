define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('EditCtrl',
            ['$window', '$scope', '$location', '$resource', '$routeParams', function ($window, $scope, $location, $resource, $routeParams) {

								var Transfer = $resource(
									'/rest/transfers/:transferId', 
									{transferId: '@id'},
									{
										update: {method: 'PUT'}
									}
								);

								var t = Transfer.get({transferId:$routeParams.transferId});
							  $scope.transfer = t;

							  $scope.save = function() {
							  	$scope.transfer.$update();
							  	$location.path('/list');
							  };

							  $scope.destroy = function() {
							  	$scope.transfer.$delete();
							  	$location.path('/list');
							  };

            }]);
});