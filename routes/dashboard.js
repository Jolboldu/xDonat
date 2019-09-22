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
    res.render('error', {data: req.user});
});
router.get('/payment_settings', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('payment_settings');
});
router.get('/payment_history', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('payment_history');
});

module.exports = router;
