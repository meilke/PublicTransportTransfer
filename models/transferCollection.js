var MongoClient = require('mongodb').MongoClient, 
	guid = require('node-uuid');

var TransferCollection = function (dbConnectionString) {
  this.dbConnectionString = dbConnectionString;

  this.cloneTransfer = function (original) {
    var cloned = {};
    
    cloned.id = original.id;
    cloned.preDestination = original.preDestination;
    cloned.preLine = original.preLine;
    cloned.postDeparture = original.postDeparture;
    cloned.postLine = original.postLine;
    cloned.transferHint = original.transferHint;

    return cloned;
  };

};

TransferCollection.prototype.insertTransfer = function (transfer, callback) {
  var id = guid.v1();

  var toBeInserted = this.cloneTransfer(transfer);
	toBeInserted.id = id;

  MongoClient.connect(this.dbConnectionString, function (err, client) {
    client.collection('transfercollection').insert(toBeInserted, function (err, result) {
    	callback(err, toBeInserted);
  		client.close();
    });
  });
};

TransferCollection.prototype.getTransferById = function (id, callback) {
	
	MongoClient.connect(this.dbConnectionString, function (err, client) {
    client.collection('transfercollection').findOne({'id': id}, function (err, result) {
      callback(err, result);
      client.close();
    });
  });

};

TransferCollection.prototype.updateTransferById = function (transfer, callback) {
	
	var toBeUpdated = this.cloneTransfer(transfer);

	MongoClient.connect(this.dbConnectionString, function (err, client) {
    client.collection('transfercollection').update({'id': toBeUpdated.id}, toBeUpdated, function (err, result) {
      callback(err, result);
      client.close();
    });
  });

};

TransferCollection.prototype.deleteTransferById = function (id, callback) {
	
	MongoClient.connect(this.dbConnectionString, function (err, client) {
    client.collection('transfercollection').findAndModify({'id': id}, null, null, {remove: true}, function (err, result) {
      callback(err, result);
      client.close();
    });
  });

};

TransferCollection.prototype.queryTransfers = function (query, callback) {

	MongoClient.connect(this.dbConnectionString, function (err, client) {
    client
    	.collection('transfercollection')
    	.find(query)
    	.toArray(function(err, docs) {
    		callback(err, docs);
    		client.close();
    	});
  });

};

TransferCollection.prototype.getFullTransfer = function (query, callback) {

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