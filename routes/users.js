var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.find((err,data)=>{
  	res.json(data);
  })
  console.log('Не палим наши схемы');
});

module.exports = router;
