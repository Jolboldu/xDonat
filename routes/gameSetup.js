var express = require('express');
var router = express.Router();
var models = require('../models');
var logger = require('../logger');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/twitch');
    } else {
        next();
    }
};

router.post('/wheel', authCheck, (req,res)=>{
	newWhell = new models.Wheel({
		userId: req.user.id,
		section1: req.body.section1,
		section2: req.body.section2,
		section3: req.body.section3,
		section4: req.body.section4,
		section5: req.body.section5,
		section6: req.body.section6,
		section7: req.body.section7,
		section8: req.body.section8,
		section9: req.body.section9,
		section10: req.body.section10
	}).save((err, data) => {
		if(err)
	        logger.recordError('gameSetup.js', 'setup new wheel', err);
		else
			res.redirect('/dashboard/');
	})
});

router.get('/wheel', authCheck, (req,res)=>{

	models.Wheel.findOne({userId: req.user.id}, (err, data) => {
		if(err)
	        logger.recordError('gameSetup.js', 'getting users wheel', err);
		else{
			if(data){
				// res.json(data);
				res.redirect('/dashboard/');
			}
			else{
				res.json("no data");
			}
		}
	})
});

module.exports = router;