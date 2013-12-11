

var app = require('../../server'),
    request = require('request'),
    helper = require('../../lib/helpers.js'),
    cheerio = require('cheerio'),
    _ = require('underscore');


var baseUrl = 'http://www.bin.arnastofnun.is/',
    query = 'leit.php?q=';


app.get('/declension/:word', function(req, res) {
    var word = req.params.word;

    var params = {
        url: baseUrl.concat(query, word),
        headers: { 'User-Agent': helper.browser() }
    };

    
    getDeclensions(function(body) {
    
      return res.json( parseTable(body) );
  
  }, params);

});


var getDeclensions = function( callback, params ) {

  request.get(params, function(err, res, body) {

      if (err || res.statusCode != 200) {
          throw new Error(err);
      }

      var $;

      try {
          $ = cheerio.load( body );
      } catch(error) {
          throw new Error(error);
      }

      var result = $("#main ul li a");


      if (result.length > 1) {

          // we cant get more than 1 result back, so for now we just take the first
          // and call recursively the function again
          params.url = baseUrl.concat(result[0].attribs.href);
          getDeclensions( callback, params );
          return;
      };

      // else just call func to return data
      return callback( $("#main") );

  });

};

// Creates a sequence based on plural/singular indices in the html table
var generateSequence = function(start, max, step, increment) {

    var results = [];

    _.each(_.range(start, max), function( i ) {

        var value = (i + step * i) + increment;
    
        results.push(value, value + 1);
    });

    return results;
};


var parseTable = function( data ) {

    var type = data.find('center:first-child').contents().eq(2).text().trim();

    var singular = generateSequence(0, 4, 3, 0), plural = generateSequence(0, 4, 3, 2);
 
    var results = [];

    data.find('table tr td span').each(function(i) {
        
        var parent = this.parent();
        
        results.push({
            predicate: parent.parent().find('td:first-child').text(),
            value: this.text(),
            category: i in singular ? 'Eintala' : 'Fleirtala'
        });
    });
    
    return { results: results, type: type };
};

