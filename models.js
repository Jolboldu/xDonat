var mongoose = require('mongoose');
var schema = require('./schema');

var user = mongoose.model('user', schema.User);
var yandex = mongoose.model('yandex', schema.Yandex)

module.exports = {
	User : user,
	YandexWalltet : yandex,
}
