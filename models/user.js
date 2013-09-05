function cloneUser (original) {
    var cloned = {};
    
    cloned.id = original.id;
    cloned.email = original.email;
    cloned.displayName = original.displayName;
    cloned.givenName = original.givenName;
    cloned.familyName = original.familyName;
    cloned.openId = original.openId;

    return cloned;
}

var 	MongoClient = require('mongodb').MongoClient, 
			guid = require('node-uuid');

var UserCollection = function (dbConnectionString) {
  this.dbConnectionString = dbConnectionString;
};

UserCollection.prototype.findUser = function(query, callback) {
	MongoClient.connect(this.dbConnectionString, function (err, client) {
    client.collection('usercollection').findOne(query, function (err, result) {
      callback(err, result);
      client.close();
    });
  });
};

UserCollection.prototype.createUser = function(newUser, callback) {
	
	var toBeInserted = {
		id: guid.v1(),
		openId: newUser.identifier,
		email: newUser.profile.emails[0].value,
		givenName: newUser.profile.name.givenName,
		familyName: newUser.profile.name.familyName,
		displayName: newUser.profile.givenName,
		admin: false
	};

  MongoClient.connect(this.dbConnectionString, function (err, client) {
    client.collection('usercollection').insert(toBeInserted, function (err, result) {
    	callback(err, result[0]);
  		client.close();
    });
  });
}

exports.UserCollection = UserCollection;