var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var WheelSchema = new Schema({
	userId: {
		type:String, 
		required:false
	},
	section1: {
		type:String, 
		required:false
	},
	section2: {
		type:String, 
		required:false
	},
	section3: {
		type:String, 
		required:false
	},
	section4: {
		type:String, 
		required:false
	},
	section5: {
		type:String, 
		required:false
	},
	section6: {
		type:String, 
		required:false
	},
	section7: {
		type:String, 
		required:false
	},
	section8: {
		type:String, 
		required:false
	},
	section9: {
		type:String, 
		required:false
	},
	section10: {
		type:String, 
		required:false
	},
})

module.exports = {
	Wheel: WheelSchema,
}