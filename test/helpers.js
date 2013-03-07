//Incomplete
exports['check-globals'] = function (test) {
	var server = require('../server.js');
    test.ok(server.moment,'Moment.js module not loaded properly');
    test.done();
};