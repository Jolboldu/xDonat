var models = require('./models')

function Error(other_file, other_message, other_error)
{
	var newError = new models.ErrorLog({
		file : other_error,
		message: other_message,
		error: other_error,
	}).save((err)=>{
	})
}

module.exports = {
	recordError: Error
}