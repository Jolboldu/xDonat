var router = require('express').Router();
var models = require('../models');

// const authCheck = (req, res, next) => {
//     if (!req.user) {
//         res.redirect('/auth/twitch');
//     } else {
//         next();
//     }
// };

router.get('/:username', function(req, res, next) {
    console.log(req.params.username);

    models.User.findOne({ username: req.params.username }, (err, user_data) => {
        if (err) throw err;
        console.log(user_data);
        if (user_data) {
            models.YandexWallet.findOne({ userId: user_data._id }, (err, yandex_data) => {
                if (err) throw err;
                console.log(yandex_data);
                if (user_data) {
                    res.render('streamer', { yandex_data: yandex_data, user_data: user_data});
                }
                else
                {
                    // Have to raise ERROR 404, for now just rendering with messages
                    res.render('error');
                }
            });
        }
        else
        {
            // Have to raise ERROR 404, for now just rendering with messages
            res.render('error');
        }
    });

    // find credentials by userID 

    // reciever

  });

module.exports = router;