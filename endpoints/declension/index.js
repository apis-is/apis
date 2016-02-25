// dependencies
var app = require('../../server');
var request = require('request');
var helper = require('apis-helpers');
var cheerio = require('cheerio');
var _ = require('underscore');
var url = require('url');

var baseUrl = url.parse('http://dev.phpbin.ja.is/ajax_leit.php');

app.get('/declension/:word', function(req, res) {
  var word = req.params.word;
  baseUrl.query = {'q': word};

  var params = {
    url: url.format(baseUrl),
    headers: {
      'User-Agent': helper.browser(),
    },
  };

  getDeclensions(function(body) {
    return res.json(parseTable(body));
  }, params);
});

// return permutation of a given word
function getDeclensions(callback, params) {
  request.get(params, function(err, res, body) {
    if (err || res.statusCode != 200) {
      return res.status(500).json({error:'A request to dev.phpbin.ja.is resulted in a error'});
    }

    body = body.replace(/<!--[\s\S]*?-->/g, '');
    var $;

    try {
      $ = cheerio.load(body);
    } catch(error) {
      return res.status(500).json({
        error: 'Parsing the data from dev.phpbin.ja.is resulted in a error',
        moreinfo: error
      });
    }

    // Links mean reults!
    var result = $("a");

    // more than 1 result from request (ex: 'hús')
    if (result.length > 1) {
      // call recursively again with new url
      var id = result[0].attribs.on_click.match(/\d+/)[0];
      baseUrl.query = {'id': id};
      params.url = url.format(baseUrl);
      return getDeclensions(callback, params);
    };

    // else just call func to return data
    return callback($);
  });
};

// Creates a sequence of integers, each iteration creates a value and increments that value by 1
// step: specify how often to run the iteration
// increment: how much to increment after each iteration
function generateSequence(start, step, increment) {
  // ex:
  // input: start: 0, step: 4, increment: 3
  // output: [ 0, 1, 4, 5, 8, 9, 12, 13 ]
  var results = [];

  _.each(_.range(start, step), function(i) {
    var value = (i + increment * i);

    results.push(value, value + 1);
  });

  return results;
};

function parseTable($) {
  var type = $('small').contents().text().trim();

  // create a sequence which is the same as the index of 'Eintala' of the td's in the HTML table.
  var singular = generateSequence(0, 4, 3),
  results = [];

  $('table tr td span').each(function(i) {
    var predicate = (
      this
        .parent
        .parent
        .children
        .filter(node => node.name === 'td')[0]
        .children[0]
        .data
    );

    results.push({
      predicate: predicate,
      value: this.children[0].data,
      category: i in singular ? 'Eintala' : 'Fleirtala'
    });
  });

  return { results: results, type: type };
};
