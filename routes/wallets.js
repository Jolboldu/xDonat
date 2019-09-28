var router = require('express').Router();
var models = require('../models')
var validator = require("email-validator");

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/twitch');
    } else {
        next();
    }
};

router.get('/yandex', authCheck, (req, res) => {
    models.YandexWallet.drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        // db.close();
      });
    res.send("nice");
    // models.YandexWallet.find({}, (err, data) => {
    //     res.json(data);
    // })
    console.log('Не палим наши схемы');
});

// these kinda 'get' has to be in the Streamer's page, should be deleted next commit
// router.get('/yandex/pay', (req, res) => {
//     res.render('form');
// });

// handling HTTP requests from Yandex after success payment to streamer
router.post('/yandex/requests', (req, res) => {
    console.log(req.body)
});

module.exports = router;
