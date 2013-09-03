var transferCollection;

exports.SetTransferCollection = function(newTransferCollection) {
  transferCollection = newTransferCollection;
}

exports.AddNewTransfer = function(req, res) {
  transferCollection.insertTransfer(req.body, function(err, id) {
    if (err) {
      res.status(404);
      res.send(err);
    }
    else {
      res.send(id);
    }
  });
};

exports.GetTransfer = function(req, res) {

  var id = req.params.id;
  transferCollection.getTransferById(id, function (err, result) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(result);
    }
  });

};

exports.UpdateTransfer = function(req, res) {

  var id = req.params.id;

  transferCollection.updateTransferById(req.body, function (err, result) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(result);
    }
  });

};

exports.DeleteTransfer = function(req, res) {

  var id = req.params.id;

  transferCollection.deleteTransferById(id, function (err, result) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(result);
    }
  });

};

exports.GetFullTransfer = function(req, res) {

  transferCollection.getFullTransfer(req.body, function (err, result) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(result);
    }
  });

};

exports.QueryTransfers = function(req, res) {

  transferCollection.queryTransfers(req.query, function (err, result) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(result);
    }
  });

};