function  sendDataOrError (err, data, res) {
  if (err) {
    res.status(404);
    res.send(err);
  }
  else {
    res.send(data);
  }
}

var transferCollection;

exports.SetTransferCollection = function(newTransferCollection) {
  transferCollection = newTransferCollection;
}

exports.AddNewTransfer = function(req, res) {
  transferCollection.insertTransfer(req.body, function (err, data) {
    sendDataOrError(err, data, res);
  });
};

exports.GetTransfer = function(req, res) {
  var id = req.params.id;
  transferCollection.getTransferById(id, function (err, data) {
    sendDataOrError(err, data, res);
  });
};

exports.UpdateTransfer = function(req, res) {
  var id = req.params.id;
  transferCollection.updateTransferById(req.body, function (err, data) {
    sendDataOrError(err, data, res);
  });
};

exports.DeleteTransfer = function(req, res) {
  var id = req.params.id;
  transferCollection.deleteTransferById(id, function (err, data) {
    sendDataOrError(err, data, res);
  });
};

exports.GetFullTransfer = function(req, res) {
  transferCollection.getFullTransfer(req.body.query, function (err, data) {
    sendDataOrError(err, data, res);
  });
};

exports.QueryTransfers = function(req, res) {
  transferCollection.queryTransfers(req.query, function (err, data) {
    sendDataOrError(err, data, res);
  });
};