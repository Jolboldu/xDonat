var router = require('express').Router();
var models = require('../models')
var validator = require('validator');
var logger = require('../logger');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/twitch');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('dashboard', { data: req.user });
});

router.get('/payment_settings', authCheck, (req, res) => {
    models.YandexWallet.findOne({ userId: req.user.id }, (err, data) => {
        if (err)
        {
            logger.recordError('dashboard.js', 'searching for payment_settings', err);
            res.render('error');
        }
        else{
            if (data) {
                //credentials has been written
                res.render('payment_settings', { data: req.user, yandexData: data});
            }
            else 
            {
                // to enter credentials
                res.render('payment_settings', { data: req.user });
            }
        }
    });

});

router.post('/payment_settings', authCheck, (req, res) => {

    validator.trim(req.body.address);
    // validator.trim(req.body.email);
    validator.trim(req.body.secret);

    models.YandexWallet.findOne({ userId: req.user.id }, (err, data) => {
        if (err)
            logger.recordError('dashboard.js', 'searching for existing yandex wallet', err);
        else{
            //check if already exists wallet yandex
            if (!data){ 
                
                //check if data is valid
                // if( req.body.address.length == 15 && validator.isEmail(req.body.email) &&  req.body.secret.length == 24) {
                if( req.body.address.length == 15 &&  req.body.secret.length == 24) {
        
                    var newYandexWallet = models.YandexWallet({
                        userId: req.user.id,
                        addressOfWallet: req.body.address,
                        // emailOfYandex: req.body.email,
                        secretOfWallet: req.body.secret,
                    }).save((error) => {
                        if(error)
                        {
                            logger.recordError('dashboard.js', 'saving new yandex wallet', error);
                            res.render('error');
                        }else{
                            console.log('Added to database');
                            var success_message = encodeURIComponent('success_save');
                            res.redirect('/dashboard/payment_settings?valid=' + success_message);
                            }
                        })
                }
                else{
                    console.log('Invalid data(email or adress or secret)');
                    var data_error = encodeURIComponent('data_error');
                    res.redirect('/dashboard/payment_settings?valid=' + data_error);   
                }
            }
            else 
            {
                res.render('payment_settings', { data: req.user });
            }
        }
    });
});

router.get('/payment_history', authCheck, (req, res) => {
    res.render('payment_history', { data: req.user });
});

module.exports = router;
