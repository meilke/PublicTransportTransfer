var transferCollection;

exports.SetTransferCollection = function(newTransferCollection) {
  transferCollection = newTransferCollection;
}

exports.AddNewTransfer = function(req, res) {
  if (typeof(req.body.content) === 'undefined') {
    res.status(404);
    res.send(err);
  } else {
    transferCollection.insertTransfer(req.body, function(err, id) {
      res.send(id);
    });
  }
};

exports.GetTransfer = function(req, res) {

	console.log('GetTransfer');
  
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

	console.log(req.body);

  transferCollection.queryTransfers(req.body, function (err, result) {
    if (err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(result);
    }
  });

};