var router = require('express').Router();
var models = require('../models')
var validator = require("email-validator");
var sha1 = require('sha1');
var socketLib = require('../socketApi.js')
var validator = require('validator');
var logger = require('../logger');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/twitch');
    } else {
        next();
    }
};

function handleRequest( req, res, donateData)
{
    socketLib.text_donate(); //render message or game

    var newPaymentYandex = models.PaymentYandex({   //save yandex payment
        notification_type : req.body.notification_type,
        amount : req.body.amount,
        codepro : req.body.codepro,
        withdraw_amount : req.body.withdraw_amount,
        unaccepted : req.body.unaccepted,
        datetime : req.body.datetime,
        sender : req.body.sender,
        operation_label: req.body.operation_label,
        operation_id: req.body.operation_id,
        currency : req.body.currency,
        donateId : req.body.label
    }).save((err, data) => {
        if(err)
            logger.recordError('wallets.js', 'saving new yandex payment', err);
        else{
            var newPayment = models.Payment({   //save as regular payment and linked to yandex payment
                typeOfPayment : "yandex", 
                paymentId : data.id,
            }).save((error)=> {
                if(error)
                    logger.recordError('wallets.js', 'saving new payment', error);
            })
        }
    })
}


router.post('/yandex/pay', (req, res) => {    
    validator.trim(req.body.text);
    validator.trim(req.body.donater);
    validator.trim(req.body.game);

    if(validator.isNumeric(req.body.reciever) && validator.isNumeric(req.body.amount))
    {
        var newDonate = new models.Donate({
            text: req.body.text,
            donater: req.body.donater,
            game: req.body.game,
            reciever: req.body.reciever,
            userId: req.body.userId,
            amount: req.body.amount,
        }).save((err, data) => {
            if(err)
            {
                logger.recordError('wallets.js', 'saving new donate', err);
            }
            else{
                res.render('form', {id: data.id, amount: req.body.amount, reciever: req.body.reciever});   
            }
        })
    }
    else
    {
        res.json("adress of yandex wallet and amount of money have to be Numeric");
    }
});

// handling HTTP requests from Yandex after success payment to streamer
router.post('/yandex/requests', (req, res) => {
    //find to pass donate data to game
    models.Donate.findOne({_id: req.body.label}, (err, data) => {
        if(err) 
            logger.recordError('wallets.js', 'trying to find mathing yandex label and donateId ', err);
        else{
             //find to get secret of wallet and check if yandex request is valid 
            models.YandexWallet.findOne({addressOfWallet: data.reciever}, (error, wallet)=>{
                if(error) 
                    logger.recordError('wallets.js', 'trying to find secret of yandex', error);
                else{
                    var wholeInfo = req.body.notification_type + "&" + req.body.operation_id + "&" + req.body.amount + "&" + req.body.currency + "&" + req.body.datetime + "&" + req.body.sender + "&" + req.body.codepro + "&" + wallet.secretOfWallet + "&" + req.body.label;
                    if(req.body.sha1_hash == sha1(wholeInfo)){
                        handleRequest(req, res, data)       
                    }else{
                        logger.recordError('wallets.js', 'failure attempt of faking payment or no yandex secret', error);
                    }
                }
            })

        }
    })    
});


module.exports = router;