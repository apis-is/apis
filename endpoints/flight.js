module.exports = function(app) {

    var flights = require('flights');

    app.get('/:type/kef', 60, function(req, callback) {

        flights.kef(req.params.type, {
            language: req.query.language
        }, callback);
    });
};