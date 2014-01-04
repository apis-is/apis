module.exports = function(app) {

    var flights = require('../../modules/flights');

    app.get('/:type/kef', 60, function(req, callback) {

        flights.kef(req.params.type, {
            language: req.query.language
        }, callback);
    });
};