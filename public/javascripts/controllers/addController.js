define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('AddCtrl',
            ['$window', '$scope', '$location', '$resource', function ($window, $scope, $location, $resource) {

								$scope.save = function() {
							    var Transfer = $resource('/rest/transfers');
			            
			            var newTransfer = new Transfer({
										preDestination: this.transfer.preDestination,
										postDeparture: this.transfer.postDeparture,
										preLine: this.transfer.preLine,
										postLine: this.transfer.postLine,
										transferHint: this.transfer.transferHint
									});
								
									newTransfer.$save();
									$location.path('/list');
							  };

            }]);
});
