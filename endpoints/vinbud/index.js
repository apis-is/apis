var endpoint = require('apis-endpoint')();
module.exports = endpoint;

var vinbud = require('vinbud');

/**
 * Search for vínbúð opening times
 * @param {String} name         Search by name
 */
endpoint.get('/', function(req, res, fail) {
  vinbud.opening_times(req.query, function(err, data) {
    if (err) return fail(err);

    return res.json(data);
  });
});
