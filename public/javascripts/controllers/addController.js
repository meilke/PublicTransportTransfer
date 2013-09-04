define(['controllers/controllers', 
				'services/locationService', 
				'services/transferService'],
		function (controllers) {
				controllers.controller('AddCtrl',
						[	'$scope', 'LocationService', 'TransferService',
							function ($scope, LocationService, TransferService) {

								$scope.save = function() {

									var newTransfer = new TransferService.Transfer({
										preDestination: this.transfer.preDestination,
										postDeparture: this.transfer.postDeparture,
										preLine: this.transfer.preLine,
										postLine: this.transfer.postLine,
										transferHint: this.transfer.transferHint
									});
								
									newTransfer.$save();
									LocationService.goToPath('/list');
								};

						}]);
});
