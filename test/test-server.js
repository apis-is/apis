exports['check-globals'] = function (test) {
	var server = require('../server.js');
    test.ok(server.moment);
    test.done();
};