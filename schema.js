var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type:String, 
		required:true
	},
	profileId: {
		type:Number, 
		required:true 
	}, 
	profileImageUrl: { 
		type:String, 
		required:true 
	},
})

module.exports = {
	User: userSchema,
}
