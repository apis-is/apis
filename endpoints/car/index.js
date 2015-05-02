var endpoint = require('apis-endpoint')();
module.exports = endpoint;

var car = require('car');

/**
 * Search through the icelandic car registry
 */
endpoint.get('/is/:carPlate', function(req, res, fail) {
  car.is(req.params.carPlate, function(err, data) {
    if (err) return fail(err);

    return res.json(data);
  });
});
