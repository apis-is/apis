var endpoint = require('apis-endpoint')();
module.exports = endpoint;
var lottery = require('icelandic-lottery');

// Lottery route handler
var lotteryResults = function(req, res) {
  // Curry the get number function
  return lottery.getNumbers(function(err, numbers) {
    if (err) {
      return res.json({error: err});
    }
    return res.json(numbers);
  }, req.path.substr(1));
};

// Set up all the endpoints with our generic currying function.
endpoint.get('/lotto', lotteryResults);
endpoint.get('/vikingalotto', lotteryResults);
endpoint.get('/eurojackpot', lotteryResults);
