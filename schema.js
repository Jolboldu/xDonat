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
		type : Number,
		required : true
	},
	emailOfYandex : {
		type : String,
		required : true
	},
	secretOfWallet : {
		type : String,
		required : true,
	},
})

var donateSchema = new Schema({
	text: {
		type : String,
		required : false,
	},
	donater : {
		type : String,
		required : true
	},
	reciever : {
		type : Number,
		required : true
	},
	userId: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	datetime : {
		type : Date,
		default: Date.now,
		required : true
	},
	game : {
		type : String,
		required : true
	}
})

var paymentSchema = new Schema({
	typeOfPayment: {
		type : String,
		required : true,
	},
	paymentId : {
		type : String,
		required : true
	}
})

var paymentYandexSchema = new Schema({
	notification_type: {
		type : String,
		required : true,
	},
	amount: {
		type : Number,
		required : true,
	},
	codepro: {
		type : Boolean,
		required : true,
	},
	withdraw_amount : {
		type : Number,
		required : true
	},
	unaccepted: {
		type : Boolean,
		required : true,
	},
	datetime : {
		type : String,
		required : true
	},
	sender : {
		type : Number,
		required : true
	},
	operation_label: {
		type: String,
		required: true,
	},
	operation_id : {
		type : String,
		required : true
	},
	currency : {
		type : Number,
		required : true
	},
	donateId : {
		type: String,
		required : true
	}
})

var errorLogSchema = new Schema({
	datetime : {
		type : Date,
		default: Date.now,
		required : true
	},
	file : {
		type : String,
		required : true
	},
	message : {
		type : String,
		required : false
	},
	error : {
		type : String,
		required : true
	},
})

module.exports = {
	User: userSchema,
	Yandex: yandexSchema,
	Donate: donateSchema,
	Payment: paymentSchema,
	PaymentYandex: paymentYandexSchema,
	ErrorLog: errorLogSchema,
}