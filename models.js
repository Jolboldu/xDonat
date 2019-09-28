var mongoose = require('mongoose');
var schema = require('./schema');

var user = mongoose.model('user', schema.User);
var yandex = mongoose.model('yandex', schema.Yandex);
var donate = mongoose.model('donate', schema.Donate);
var payment = mongoose.model('payment', schema.Payment);
var paymentYandex = mongoose.model('paymentYandex', schema.Payment);

module.exports = {
	User : user,
	YandexWallet : yandex,
	Donate : donate,
	Payment: payment,
	PaymentYandex: paymentYandex,
}
