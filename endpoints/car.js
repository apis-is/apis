module.exports = function(app) {
    var car = require('car');
    app.get('/is/:id', 3600, function(req, callback) {
        car.is(req.params.id, callback)
    });
};