// Depedencias
var express = require('express')
, http = require('http')
, path = require('path')
, mongoose = require('mongoose')
, bodyParser = require('body-parser')

//var User = require('./models/user');


var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = '1665906187062783';
var FACEBOOK_APP_SECRET = '0be733f75a00bf42932bf9eb8b7a8d33';

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


// Configuracion
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
    res.render('index');
});

// Puerto y servidor
var server = http.createServer(app);
server.listen(3000);




// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
);