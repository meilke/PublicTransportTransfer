var MongoClient = require('mongodb').MongoClient, 
	guid = require('node-uuid');

var TransferCollection = function (dbConnectionString) {
  this.dbConnectionString = dbConnectionString;
};

TransferCollection.prototype.insertTransfer = function (transfer, callback) {
  var id = guid.v1();
  transfer.id = id;

  MongoClient.connect(this.dbConnectionString, function (err, client) {
    client.collection('transfercollection').insert(transfer, function (err, result) {
    	callback(err, transfer);
  		client.close();
    });
  });
};

TransferCollection.prototype.getTransferById = function (id, callback) {
	
	var testdata = {
		preDestination: 'Sendlinger Tor',
		postDeparture: 'Sendlinger Tor',
		preLine: 'U6',
		postLine: 'U6',
		transferHint: 'Center'
	};

	callback(null, testdata);
};

TransferCollection.prototype.queryTransfers = function (query, callback) {

	var testdata = [
		{
			preDestination: 'Sendlinger Tor',
			postDeparture: 'Sendlinger Tor',
			preLine: 'U6',
			postLine: 'U6',
			transferHint: 'Center'
		}
	];

	callback(null, testdata);
};

exports.TransferCollection = TransferCollection;