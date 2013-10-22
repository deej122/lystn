var express = require('express')
  , routes = require('./routes')
  , posts = require('./routes/posts')
//  , posts = require('./routes/posts')
//  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , util = require('util')
  , TwitterStrategy = require('passport-twitter').Strategy;

/*Twitter Authentication*/
var TWITTER_CONSUMER_KEY = "qLmmZnQpDibkEaVYHihQ";
var TWITTER_CONSUMER_SECRET = "7amIx7R06WEMxv27egJIRB8o4yshLR9gm14ou46zRu8";
/*End Twitter Authentication*/

  var TwitterUserSchema = new mongoose.Schema({
  	twitterId: String,
  	name: String,
  	img: String
  });
  var twitterUsers = mongoose.model('tws', TwitterUserSchema);

  passport.use(new TwitterStrategy({
  		consumerKey: TWITTER_CONSUMER_KEY,
    	consumerSecret: TWITTER_CONSUMER_SECRET,
    	callbackURL: "http://127.0.0.1:3000/profile"
  	},
  	function(token, tokenSecret, profile, done){
  		twitterUsers.findOne({twitterId: profile.id}, function(err, oldUser){
  			if(oldUser){
  				done(null,oldUser);
  			}else{
  				var newUser = new twitterUsers({
  					twitterId: profile.id,
  					name: profile.displayName,
  					img: profile._json.profile_image_url,
  				}).save(function(err,newUser){
  					if(err) throw err;
  					done(null,newUser);
  				});
  			}
  		});
  	}
  ));

  passport.serializeUser(function(user,done){
  	done(null, user.id);
  });

  passport.deserializeUser(function(id,done){
  	twitterUsers.findById(id,function(err,user){
  		if(err) done(err);
  		if(user){
  			done(null, user);
  		}
  	});
  });

var app = express();

//set up all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'nanananananananabatman'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/stylesheets'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/scripts'));

app.get('/', routes.index);
app.get('/profile', routes.profile);
app.get('/logout', routes.logout);

/*Twitter Auth Routes*/
app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
    // The request will be redirected to Twitter for authentication, so this
    // function will not be called.
  });

/*app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
  });
*/
app.post('/auth/twitter/callback', posts.addUser);

/*End Twitter Auth Routes*/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
*/
function authenticatedOrNot(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/");
    }
}

/*Retrieve home_timeline for user*/

/*end retrieve home_timeline for user*/