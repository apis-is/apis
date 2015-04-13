var endpoint = require('apis-endpoint')();
module.exports = endpoint;

var althingi = require('althingi');

endpoint.get('/', function(req, res, fail) {
  althingi.list(function(err, data) {
    if (err) {
      return fail(err);
    }

    return res.json(data);
  });
});

endpoint.get('/:id/votes/', function(req, res, fail) {
  althingi.votes(req.params.id, function(err, data) {
    if (err) {
      return fail(err);
    }

    return res.json(data);
  });
});
