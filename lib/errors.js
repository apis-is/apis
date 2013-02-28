//First draft of the new error handler
var errors = [
	false,
	{"code": 1, "message": "test!"}
];

exports.new = function(code){
	var output = errors[code];
	output.error = true;
	return output;
}