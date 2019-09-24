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
        if (data) {
            res.render('payment_settings', { data: req.user, yandexData: data});
            // res.send('Подключены')
        }
        else 
        {
            res.render('payment_settings', { data: req.user });
            // res.send('Не подключены')
        }
    });


});

router.post('/payment_settings', authCheck, (req, res) => {
    var yandex_address = req.body.address;
    var email = req.body.email;
    console.log(yandex_address);

    //need to check if already exists wallet yandex

    if (yandex_address.length == 15) {
        if (validator.validate(email)) {

            var newYandexWallet = models.YandexWallet({
                userId: req.user.id,
                addressOfWallet: yandex_address,
                emailOfYandex: email,
            }).save((err) => {
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
});

router.get('/payment_history', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('payment_history', { data: req.user });
});

module.exports = router;
