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

router.get('/full', authCheck, function(req, res, next) {
	var query = models.Donate.find({userId: req.user.id}, (err, data) => {
		// models.PaymentYandex.find(donateId: data.)
	});
	
	query.then((data)=>{
		res.send(data);
	});
});

router.get('/', function(req, res, next) {
	res.send("stats");
});

module.exports = router;

