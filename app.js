
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var rest = require('./routes/rest');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var GoogleStrategy = require('passport-google').Strategy;

var MemoryStore = express.session.MemoryStore;

var transferCollection = require('./models/transferCollection');
var userCollection = require('./models/user');

var app = express();
app.set('port', process.env.PORT || 3000);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var userConnection = 'mongodb://localhost:27017/userdb';
var User = new userCollection.UserCollection(userConnection);

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:' + app.get('port') + '/auth/google/return',
    realm: 'http://localhost:' + app.get('port')
  },
  function(identifier, profile, done) {
    User.findUser({openId: identifier}, function(err, user) {
      
    	if (err) { return done(err); }
      if (user) { 
      	if (user.admin) {
      		return done(null, user);
      	}
    		
    		return done(null, false);	
      }

      User.createUser({identifier: identifier, profile: profile}, function (err, newUser) {});
      return done(null, false);	
    });
  }
));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser()); 

app.use(express.session({
        store: new MemoryStore(),
        secret: 'secret',
        key: 'bla'
    }));

app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var connection = 'mongodb://localhost:27017/transferdb';
var tc = new transferCollection.TransferCollection(connection);
rest.SetTransferCollection(tc);

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', 
  passport.authenticate('google', { successReturnToOrRedirect: '/index.html',
                                    failureRedirect: '/index.html' }));
app.get('/auth/logout', function(req, res){
  req.logout();
  res.redirect('/index.html');
});

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/rest/transfers/query', ensureAuthenticated, rest.QueryTransfers);
app.post('/rest/transfers/fullTransferQuery', rest.GetFullTransfer);

app.post('/rest/transfers', ensureAuthenticated, rest.AddNewTransfer);
app.get('/rest/transfers/:id', ensureAuthenticated, rest.GetTransfer);
app.put('/rest/transfers/:id', ensureAuthenticated, rest.UpdateTransfer);
app.delete('/rest/transfers/:id', ensureAuthenticated, rest.DeleteTransfer);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.status(401);
  res.send("Not authenticated!");
}
