var endpoint = require('apis-endpoint')();
module.exports = endpoint;

var firm = require('firm');

/**
 * Search for icelandic companies
 * @param {String} name         Search by name
 * @param {String} address      Search by address
 */
endpoint.get('/is', function(req, res, fail) {
  // TODO input validation
  firm.is(req.query, function(err, data) {
    if (err) return fail(err);

    res.json(data.results);
  });
});

endpoint.get('/is/:kt', function(req, res, fail) {
  firm.is({ssn: req.params.kt}, function(err, data) {
    if (err) return fail(err);

    if (!data.results || data.results.length === 0)
      return fail(404);

    res.json(data.results[0]);
  });
});
