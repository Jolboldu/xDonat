var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var keys = require('../constants');
var request = require('request');
var models = require('../models')

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  var options = {
    url: 'https://api.twitch.tv/helix/users',
    method: 'GET',
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': 'Bearer ' + accessToken
    }
  };

  request(options, function (error, response, body) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
}


passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
    tokenURL: 'https://id.twitch.tv/oauth2/token',
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    state: true,
  },
  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;

    models.User.findOne({profileId: profile.data[0].id}, (err, data) => {
    	if(data){
    		console.log("user accessed");
    		done(null, data);
    	}
    	else{
    		var newUser = new models.User({
    			username: profile.data[0].login,
    			profileId : profile.data[0].id,
    			profileImageUrl: profile.data[0].profile_image_url,
    		}).save((err)=>{
    			console.log("user added");
    			done(null, newUser);
    		})
    	}
    })
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    models.User.findById(id).then((user) => {
        done(null, user);
    });
})
