var router = require('express').Router();
var models = require('../models');
var validator = require('validator');
var logger = require('../logger');

router.get('/:username', function(req, res, next) {
    validator.trim(req.params.username);

    models.User.findOne({ username: req.params.username }, (err, user_data) => {
        if (err)
        {
            logger.recordError('streamer.js', 'searching for streamer', err);
            res.render('error');
        }
        else{
            if (user_data) {
                models.YandexWallet.findOne({ userId: user_data._id }, (error, yandex_data) => {
                    if (error)
                    {
                        logger.recordError('streamer.js', 'searching for yandex wallet ', error);
                        res.render('error');
                    }else{

                        if (user_data) {
                            res.render('streamer', { yandex_data: yandex_data, user_data: user_data});
                        }
                        else
                        {
                            // Have to raise ERROR 404, for now just rendering with messages
                            res.render('error');
                        }
                    }
                });
            }
            else
            {
                // Have to raise ERROR 404, for now just rendering with messages
                res.render('error');
            }
        }
    });
  });

module.exports = router;