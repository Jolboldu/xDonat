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

var yandexSchema = new Schema({
	userId: {
		type : String,
		required : true
	},
	addressOfWallet : {
		type : String,
		required : true
	},
	emailOfYandex : {
		type : String,
		required : true
	}
})

module.exports = {
	User: userSchema,
	Yandex: yandexSchema,
}
