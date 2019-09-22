var router = require('express').Router();
var models = require('../models')

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
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
    // Joma add to database
});

router.get('/payment_history', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('payment_history', {data: req.user});
});

module.exports = router;
