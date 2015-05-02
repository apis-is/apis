var endpoint = require('apis-endpoint')();
module.exports = endpoint;

var tvinna = require('tvinna');

/**
 * Get tvinna.is job opportunities.
 */
endpoint.get('/tvinna', function(req, res, fail) {
  tvinna(function(err, data) {
    if (err) return fail(err);

    return res.json(data);
  });
});
