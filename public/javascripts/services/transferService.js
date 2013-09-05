define(['services/services'],
  function (services) {
      services.factory('TransferService', ['$resource', 
        function ($resource) {

            return {

                Transfer: $resource(
                    '/rest/transfers/:transferId', 
                    {transferId: '@id'},
                    {
                        update: {method: 'PUT'}
                    }
                ),

                TransferQuery: $resource('/rest/transfers/query'),

                FullTransfer: $resource(
                    '/rest/transfers/fullTransferQuery',
                    {},
                    {
                      queryFull: {method: 'POST'}
                    })

            };

        }]);
  });
