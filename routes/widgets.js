var router = require('express').Router();
var models = require('../models');

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
    models.Wheel.findOne({userId: req.user.id}, (err, data) => {
    if(err)
        logger.recordError('gameSetup.js', 'getting users wheel', err);
    else{
        if(data){
            res.render('widgets/wheel_of_fortune', { data: req.user, gameData: data });
            console.log(data);
        }
        else{
            // res.json("no data");
            res.render('widgets/wheel_of_fortune', { data: req.user, gameData: data });
            console.log('no data');
        }
    }
})
    
});

router.get('/text_donate', authCheck, (req, res) => {
    // res.send(req.user);
    res.render('widgets/text', { data: req.user });
});


module.exports = router;