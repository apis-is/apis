var _ = require('lodash');
var endpoint = require('apis-endpoint')();
var request = require('request');
var async = require('async');
var urlBuilder = require('url');

module.exports = endpoint;

/*
 * Get the various applications that use apis.is
 */
endpoint.get('/users/', function(req, res, fail) {
  return res.json(require('./json/users.json'));
});

/**
 * Get the maintainers of the project.
 */
endpoint.get('/maintainers/', function(req, res, fail) {
  // Github will allow some low number of requests per IP per hour (50?)
  // without authentication so this will not be always needed but should be set
  // in production.
  var query = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET
  };
  
  var github_url = urlBuilder.format({
    protocol: "https",
    host: "api.github.com",
    pathname: "/orgs/apis-is/public_members",
    query: query
  });

  // Github want's user agents to be able to diffrienciate between apps.
  var headers = { 'User-Agent': 'apis-is' };
  var options = { url: github_url , headers: headers };
 
  // These are the attributes we'll pull from the github API user object. 
  var properties = ['name', 'url', 'bio', 'email', 'avatar_url', 'login'];

  async.waterfall([
    function(callback) {
      // Fetch all the maintainer urls and pass it on.
      request.get(options, function(err, response, body) {
        if (err) return res.json({error: err});
        var json = JSON.parse(body);
        callback(null, json.map(function(e) { return e.url + urlBuilder.format({query: query}); }));
      });
    },
    function(urls, callback) {
      // Fetch each individual user and pass that data onwards.
      async.map(urls, function(url, cb) {
        request.get({url: url, headers: headers}, function(err, response, body) {
          cb(null, _.pick(JSON.parse(body), properties));
        });
      }, function(err, result) { 
        callback(null, result);
      });
    }
  ],
  function(err, results) {
    if (err) {
      res.json({error: err});
    } else {
      res.json(results);
    }
  });
});

/**
 * Get a list of all contributors to the project.
 */
endpoint.get('/contributors/', function(req, res, fail) {
  var options = {
    url: 'https://api.github.com/repos/apis-is/apis/contributors',
    headers: {
      'User-Agent': 'apis-is'
    }
  };

  request.get(options, function(err, response, body) {
    if (err) return res.json({error: err});

    var maintainers = _.map(JSON.parse(body), function(n) {
      return _.pick(n, ['login', 'avatar_url', 'url', 'contributions']);
    });

    return res.json(maintainers);
  });
});

/**
 * Get a list of official sponsors of the project.
 */
endpoint.get('/sponsors/', function(req, res, fail) {
  return res.json({
      'nosponsors': 'No sponsors yet! Contact us at apis@apis.is if you\'re interested!'
    });
});

/**
 * Content for docs about section
 */
endpoint.get('/about/', function(req, res, fail) {
  return res.json(require('./json/about.json'));
});
