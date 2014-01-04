module.exports = function (app) {
	var firm = require('firm');
	app.get('/is', 3600, function (req, callback) {
		console.log('hitting')
		firm.is({
			name: req.query.name,
			address: req.query.address,
			socialnumber: req.query.socialnumber,
			vsknr: req.query.vasknr
		}, callback)
	});
};