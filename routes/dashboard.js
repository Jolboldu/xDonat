var router = require('express').Router();
var models = require('../models')
var validator = require("email-validator");

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/twitch');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('dashboard', {data: req.user});
});

router.get('/payment_settings', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('payment_settings', {data: req.user});
});

router.post('/payment_settings', authCheck, (req, res) => {
    var yandex_address = req.body.address;
    var email = req.body.email;
    console.log(yandex_address);

//need to check if already exists wallet yandex
    
    if(yandex_address.length == 15)
    {
        if(validator.validate(email))
        {

            var newYandexWallet = models.YandexWallet({
                userId: req.user.id,
                addressOfWallet: yandex_address,
                emailOfYandex: email,
            }).save( (err) => {
                console.log('got it');
                res.json('got it');
            })
        }            
    }
});

router.get('/payment_history', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('payment_history', {data: req.user});
});

module.exports = router;
