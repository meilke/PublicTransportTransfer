define(['controllers/controllers', 'services/transferService'],
    function (controllers) {
        controllers.controller('ListCtrl',
            ['$scope', 'TransferService', function ($scope, TransferService) {

							var query = {};
							// var query = {transferHint: 'Center'};
							
							var transfers = TransferService.TransferQuery.query(
								query, 
								function(value, responseHeaders) {
									$scope.transfers = transfers;
								},
								function(errorHttpResponse) {
									$scope.problem = errorHttpResponse;
								});

            }]);
});
