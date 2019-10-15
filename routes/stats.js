var express = require('express');
var router = express.Router();
var models = require('../models')

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/twitch');
    } else {
        next();
    }
};

/* GET users listing. */

router.get('/full', function(req, res, next) {
	models.Donate.find({userId: req.user.id}, (err, data) => {
		res.send(data);
	})
});


module.exports = router;

