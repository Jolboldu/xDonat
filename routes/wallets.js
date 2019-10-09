var router = require('express').Router();
var models = require('../models')
var validator = require("email-validator");
var sha1 = require('sha1');
var functionLib = require('./donation.js')

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/twitch');
    } else {
        next();
    }
};

function handleRequest(paymentAccepted, req, res, donateData)
    {
        if(paymentAccepted)
        {
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
                {
                    console.log(err);
                }
                var newPayment = models.Payment({   //save as regular payment and linked to yandex payment
                    typeOfPayment : "yandex", //for now yandex is ok
                    paymentId : data.id,
                }).save((err)=> {
                    // var gameData = encodeURIComponent(JSON.stringify(donateData));
                    // var url = '/donation';
                    test_data = 'pusto poka';
                    functionLib.textDonate(test_data);
                    // res.redirect(url+'/?valid=' + gameData) //http code 307 
                })
                console.log(data);
            })
        }
    }
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



router.post('/yandex/pay', (req, res) => {    
    var newDonate = new models.Donate({
        text: req.body.text,
        donater: req.body.donater,
        game: req.body.game,
        reciever: req.body.reciever,
    }).save((err, data) => {
        if(err)
        {
            res.send("err");
        }
        res.render('form', {id: data.id, amount: req.body.amount, reciever: req.body.reciever});
        })
});

// handling HTTP requests from Yandex after success payment to streamer
router.post('/yandex/requests', (req, res) => {    
    console.log(req.body);
    models.Donate.findOne({_id: req.body.label}, (err, data) => {
        models.YandexWallet.findOne({addressOfWallet: data.reciever}, (error, wallet)=>{
            var wholeInfo = req.body.notification_type + "&" + req.body.operation_id + "&" + req.body.amount + "&" + req.body.currency + "&" + req.body.datetime + "&" + req.body.sender + "&" + req.body.codepro + "&" + wallet.secretOfWallet + "&" + req.body.label;
            if(req.body.sha1_hash == sha1(wholeInfo)){
                console.log("hashes are equal")
                paymentAccepted = true;    
                handleRequest(paymentAccepted, req, res, data)       
            }else{
                console.log("wrong hashes");
                console.log(wallet.secretOfWallet);
            }
            
        })
    })    
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