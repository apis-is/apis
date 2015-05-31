var endpoint = module.exports = require('apis-endpoint')();
var flights = require('flights');

endpoint.get('/kef', function(data) {
  return flights.kefAsync({
    type: data.type || 'arrivals',
    lang: 'en' //@TODO is is also support
  });
});