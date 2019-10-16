var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.find((err,data)=>{
  	res.json(data);
  })
});

router.get('/:username', function(req, res, next) {
	models.User.findOne({ username: req.params.username }, (err, user_data) => {
        	res.send(user_data);
    	});

});


module.exports = router;
