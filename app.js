var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//need it?
var passport = require('passport');
var mongoose = require('mongoose')
var cookieSession = require('cookie-session')
var cors = require('cors')
var helmet = require('helmet')

// const textToSpeech = require('@google-cloud/text-to-speech')
// var fs = require('fs')
// var util = require('util')


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth-routes');
var dashboardRouter = require('./routes/dashboard');
var userRouter = require('./routes/users');
var WalletRouter = require('./routes/wallets');
var widgetsRouter = require('./routes/widgets');
var statsRouter = require('./routes/stats');
var streamerRouter = require('./routes/streamer');
var gameSetupRouter = require('./routes/gameSetup')
// var profileRouter = require('./routes/profile');

var keys = require('./constants');
var passportSetup = require('./config/passport-setup')

var app = express();



var donationRouter = require('./routes/donation');

app.use(helmet())
app.use(cors())

mongoose.connect(process.env.MONGO_SETUP,{ useNewUrlParser: true }, ()=>{
  console.log('connected to mongodb');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = path.join(__dirname, 'views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    name: process.env.SESSION_NAME,
    keys: [process.env.SESSION_SECRET],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'https://www.xdonat.com/'
    }
}));
// app.use(session({secret: keys.SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json()); //instead of bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', userRouter);
app.use('/wallets', WalletRouter);
app.use('/widgets', widgetsRouter);
app.use('/streamer', streamerRouter);
app.use('/donation', donationRouter);
app.use('/stats', statsRouter);
app.use('/gameSetup', gameSetupRouter);

// app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
