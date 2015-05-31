var endpoint = module.exports = require('apis-endpoint')();

var BPromise = require('bluebird');
var _ = require('lodash');
var request = require('request');
var async = require('async');
var urlBuilder = require('url');

/*
 * Get the various applications that use apis.is
 */
var users = BPromise.resolve(require('./json/users.json'));
endpoint.get('/users', users);

/**
 * Get a list of official sponsors of the project.
 */
var sponsors = BPromise.resolve(require('./json/sponsors.json'));
endpoint.get('/sponsors', sponsors);

/**
 * Content for docs about section
 */
var about = BPromise.resolve(require('./json/about.json'));
endpoint.get('/about', about);

/**
 * Get the maintainers of the project.
 */
endpoint.get('/maintainers', function() {
  // Github will allow some low number of requests per IP per hour (50?)
  // without authentication so this will not be always needed but should be set
  // in production.
  var query = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET
  };
  
  var githubUrl = urlBuilder.format({
    protocol: "https",
    host: "api.github.com",
    pathname: "/orgs/apis-is/public_members",
    query: query
  });

  // Github want's user agents to be able to diffrienciate between apps.
  var headers = { 'User-Agent': 'apis-is' };
  var options = { url: githubUrl , headers: headers };
 
  return new BPromise(function(resolve){
    request.get(options, function(err, response, body) {
      if (err) throw err;

      //Exceptions are catched in the Bpromise
      var data = JSON.parse(body);

      resolve(data.map(function(e) { 
        return e.url + urlBuilder.format({query: query}); 
      }));
    });
  }).map(function(url){
    return new BPromise(function(resolve){
      request.get({url: url, headers: headers}, function(err, response, body) {
        var data = JSON.parse(body);

        // These are the attributes we'll pull from the github API user object. 
        resolve(_.pick(data, ['name', 'url', 'bio', 'email', 'avatar_url', 'login']));
      });
    })
  });
});

/**
 * Get a list of all contributors to the project.
 */
endpoint.get('/contributors', function() {

  var options = {
    url: 'https://api.github.com/repos/apis-is/apis/contributors',
    headers: {
      'User-Agent': 'apis-is'
    }
  };

  return new BPromise(function(resolve,reject){
    request.get(options, function(err, response, body) {
      if (err) throw err;

      var data = JSON.parse(body);

      if (response.statusCode !== 200) throw new Error(data.message);

      resolve(data);
    });
  }).map(function(maintainer){
    return _.pick(maintainer, ['login', 'avatar_url', 'url', 'contributions']);
  })
});