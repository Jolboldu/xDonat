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

// router.get('/yandex', authCheck, (req, res) => {
//     models.YandexWallet.drop(function(err, delOK) {
//         if (err) throw err;
//         if (delOK) console.log("Collection deleted");
//         // db.close();
//       });
//     res.send("nice");
//     // models.YandexWallet.find({}, (err, data) => {
//     //     res.json(data);
//     // })
//     console.log('Не палим наши схемы');
// });


// these kinda 'get' has to be in the Streamer's page, should be deleted next commit
// router.get('/yandex/pay', (req, res) => {
    // res.render('form');
// });

router.post('/yandex/pay', (req, res) => {    
    var newDonate = new models.Donate({
        text: req.body.text,
        donater: req.body.donater,
        game: req.body.game,
        reciever: req.body.reciever,
    }).save((err, data) => {
        res.render('form', {id: data.id});
    })
});

// handling HTTP requests from Yandex after success payment to streamer
router.post('/yandex/requests', (req, res) => {
    console.log(req.body)

    // парсим поле label и получаем адрес стримера

    // если пришли деньги
    paymentAccepted = true;
    if (paymentAccepted) {
        models.User.findOne({ username: req.params.username }, (err, user_data) => {
            if (err) throw err;
            console.log(user_data);
            
            // if (user_data) {
            //     res.render('streamer', { user_data: user_data});
            // }
            // else
            // {
            //     // Have to raise ERROR 404, for now just rendering with messages
            //     res.render('error');
            // }
        });

    }
});

module.exports = router;
