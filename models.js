var mongoose = require('mongoose');
var schema = require('./schema');
var gameSchema = require('./gameSchema');


var user = mongoose.model('user', schema.User);
var yandex = mongoose.model('yandex', schema.Yandex);
var donate = mongoose.model('donate', schema.Donate);
var payment = mongoose.model('payment', schema.Payment);
var paymentYandex = mongoose.model('paymentYandex', schema.PaymentYandex);
var errorLog = mongoose.model('errorLog', schema.ErrorLog);
var wheel = mongoose.model('wheel', gameSchema.Wheel);

module.exports = {
	User : user,
	YandexWallet : yandex,
	Donate : donate,
	Payment: payment,
	PaymentYandex: paymentYandex,
	ErrorLog: errorLog,
	Wheel: wheel,
}
