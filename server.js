/**
 * Global npm modules
 */
exports.restify = restify = require('restify');
exports.server = server = restify.createServer();

exports.scraper = scraper = require('scraper');
exports.request = request = require('request');
exports.fs = fs = require('fs');
exports.$ = $ = require('jquery');
exports.moment = moment = require('moment');
exports.file = fileModule = require('file');
exports.parseString = parseString = require('xml2js').parseString;
exports.cheerio = cheerio = require("cheerio");
exports.isn2wgs = isn2wgs = require('isn2wgs');

/**
 * Global helpers
 */
exports.h = h = require('./lib/helpers.js');
exports.endpoints = endpoints = require('./lib/endpoints.js');

//Enables the use of posted params
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());

/**
 * Endpoints setup
 */
endpoints.load();

/**
 * Start the server
 */
server.listen(3100);
console.log('Server running at port: 3100');