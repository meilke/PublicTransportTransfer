define(['controllers/controllers', 
				'services/locationService',
				'services/transferService'],
    function (controllers) {
        controllers.controller('EditCtrl',
            [	'$scope', '$routeParams', 
            	'LocationService', 'TransferService', 
            	function ($scope, $routeParams, LocationService, TransferService) {

								var t = TransferService
													.Transfer
													.get({transferId:$routeParams.transferId}, function(result){
														var test = 'test';
													}, function(err){
														var test = 'test';
													});

							  $scope.transfer = t;

							  $scope.save = function() {
							  	$scope.transfer.$update();
							  	LocationService.goToPath('/list');
							  };

							  $scope.preDestForPostDep = function() {
							  	$scope.transfer.postDeparture = $scope.transfer.preDestination;
							  };

							  $scope.destroy = function() {
							  	$scope.transfer.$delete();
							  	LocationService.goToPath('/list');
							  };

            }]);
});