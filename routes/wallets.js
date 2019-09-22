var router = require('express').Router();
var models = require('../models')
var validator = require("email-validator");

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/yandex', authCheck, (req, res) => {
    models.YandexWallet.find({}, (err, data) => {
        res.json(data);
    })
});

module.exports = router;
