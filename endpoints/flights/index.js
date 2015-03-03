var endpoint = require('apis-endpoint')();
module.exports = endpoint;

var flights = require('flights');

/**
 * List flights from KEF airport
 */
endpoint.get('/kef', function(req, res, fail) {
  var query = {
    type: req.query.type || 'arrivals',
    lang: req.headers['accept-language'] || 'en'
  };
  flights.kef(query, function(err, data) {
    if (err) return fail(err);

    return res.json(data);
  });
});
