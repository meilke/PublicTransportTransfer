define(['controllers/controllers', 'services/transferService'],
    function (controllers) {
        controllers.controller('ListCtrl',
            ['$scope', 'TransferService', function ($scope, TransferService) {

							var query = {};
							// var query = {transferHint: 'Center'};
							
							var transfers = TransferService.TransferQuery.query(query, function() {
								$scope.transfers = transfers;
							});

            }]);
});
