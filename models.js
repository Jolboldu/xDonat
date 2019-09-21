var mongoose = require('mongoose');
var schema = require('./schema');

var user = mongoose.model('user', schema.User);

module.exports = {
	User : user,
}
