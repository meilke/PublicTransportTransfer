
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var rest = require('./routes/rest');
var transferCollection = require('./models/transferCollection');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var connection = 'mongodb://localhost:27017/transferdb';
var tc = new transferCollection.TransferCollection(connection);
rest.SetTransferCollection(tc);

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/rest/transfers', rest.AddNewTransfer);
app.post('/rest/transfers/query', rest.FindTransfer);
app.get('/rest/transfers/:id', rest.GetTransfer);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
