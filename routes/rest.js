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

exports.FindTransfer = function(req, res) {

  transferCollection.queryTransfers(req.body, function (err, result) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(result);
    }
  });

};