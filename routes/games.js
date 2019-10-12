var router = require('express').Router();
var models = require('../models');
var validator = require("email-validator");

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/twitch');
    } else {
        next();
    }
};

router.get('/slot', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('widgets/game_slot', { data: req.user });
    // res.send(req.user);
});

router.get('/wheel_of_fortune', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('widgets/wheel_of_fortune', { data: req.user });
    console.log(err);
});

router.get('/text_donate', authCheck, (req, res) => {
    // res.send(req.user);
    // res.render('widgets/wheel_of_fortune', { data: req.user });
    console.log(err);
});

router.post('/socket', (req, res) => {
    models.Donate.findOne({id: req.body.label}, (err, data) => {
        models.YandexWallet.findOne({addressOfWallet: data.reciever}, (err, dock)=> {
            console.log(dock);
            res.send("its ok")//render whatever you want user id is dock.userID
        })
    })
    
});

module.exports = router;