define(['controllers/controllers', 
				'services/locationService', 
				'services/transferService'],
		function (controllers) {
				controllers.controller('AddCtrl',
						[	'$scope', 'LocationService', 'TransferService',
							function ($scope, LocationService, TransferService) {

								$scope.preDestForPostDep = function() {
							  	$scope.transfer.postDeparture = $scope.transfer.preDestination;
							  };

								$scope.save = function() {

									var newTransfer = new TransferService.Transfer({
										preDestination: this.transfer.preDestination,
										postDeparture: this.transfer.postDeparture,
										preLine: this.transfer.preLine,
										preLineDirection: this.transfer.preLineDirection,
										postLine: this.transfer.postLine,
										postLineDirection: this.transfer.postLineDirection,
										transferHint: this.transfer.transferHint
									});
								
									newTransfer.$save();
									LocationService.goToPath('/list');
								};

						}]);
});
