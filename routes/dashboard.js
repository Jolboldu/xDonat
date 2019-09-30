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
    res.render('dashboard', { data: req.user });
});

router.get('/payment_settings', authCheck, (req, res) => {
    // res.send(req.user);

    models.YandexWallet.find({ userId: req.user.id }, (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log(req.user.id);
        if (data.length) {
            res.render('payment_settings', { data: req.user, yandexData: data});
            // res.send('Оплата Подключена')
        }
        else 
        {
            res.render('payment_settings', { data: req.user });
            // res.send('Оплата не подключена')
        }
    });

});

router.post('/payment_settings', authCheck, (req, res) => {
    //need to check if already exists wallet yandex
    models.YandexWallet.find({ userId: req.user.id }, (err, data) => {
        if (err) throw err;
        if (data.length == 0) {
            if (req.body.address.length == 15) {
                if (validator.validate(req.body.email)) {

                    var newYandexWallet = models.YandexWallet({
                        userId: req.user.id,
                        addressOfWallet: req.body.address,
                        emailOfYandex: req.body.email,
                        secretOfWallet: req.body.secret,
                    }).save((err) => {
                        if(err)
                        {
                            res.send(err);
                        }
                        console.log('Added to database');
                        var success_message = encodeURIComponent('success_save');
                        res.redirect('/dashboard/payment_settings?valid=' + success_message);
                    })
                }
                else {
                    console.log('Incorrect email');
                    var email_error = encodeURIComponent('email_error');
                    res.redirect('/dashboard/payment_settings?valid=' + email_error);
                }
            } 
        }
        else 
        {
            res.render('payment_settings', { data: req.user });
            // res.send('Оплата не подключена')
        }
    });
});

router.get('/payment_history', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('payment_history', { data: req.user });
});

router.get('/w', authCheck, (req, res) => {
    // res.send(req.user);
    models.YandexWallet.find({}, (err,data)=>{
        res.send(data)
    })
});
module.exports = router;
