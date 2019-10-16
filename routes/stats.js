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
	var stats = [];

	models.Donate.find({userId: req.user.id}, (err, data) => {
		models.PaymentYandex.find({}, (error, doc) => {
			for(i = 0; i < data.length; i++)
			{
				for(j = 0; j < doc.length; j++)
				{	
					if(data[i].id == doc[j].donateId)
					{
						stats.push(data[i]);
						break;
					}
				}
			}
			res.json(stats);
		})
	});

});

module.exports = router;

