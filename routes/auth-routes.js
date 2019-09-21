var express = require('express');
var router = express.Router();
var passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/profile', (req, res) => {
	res.send(req.user)
})

router.get('/twitch', passport.authenticate('twitch', { scope: ['user_read'] },));

router.get('/twitch/redirect', passport.authenticate('twitch'), (req,res)=>{
	res.redirect('/profile')
});

module.exports = router;