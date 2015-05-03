var endpoint = require('apis-endpoint')();
module.exports = endpoint;
var address = require('icelandic-address');

endpoint.get('/:address', function(req, res) {
  var lookupAddress = req.query.address || req.params.address || '';

  if (lookupAddress === '') {
    return res.json(431, {error: 'Please provide a valid address to lookup'});
  }

  address.lookupAddress(lookupAddress, function(err, data) {
    if (err) {
      return res.json(500, {error: err});
    }
    return res.json({results: data});
  });
});

