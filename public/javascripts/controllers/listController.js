define(['controllers/controllers'],
    function (controllers) {
        controllers.controller('ListCtrl',
            ['$window', '$scope', '$resource', function ($window, $scope, $resource) {

            	var Transfer = $resource('/rest/transfers/query');
							
							var query = {};
							// var query = {transferHint: 'Center'};
							
							var transfers = Transfer.query(query, function() {
								$scope.transfers = transfers;
							});

            }]);
});
