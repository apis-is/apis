var request = require('request');
var app = require('../../server');
var cheerio = require('cheerio');
var h = require('apis-helpers');

app.get('/parliament/journal/:section/:year/', function(req, res) {
  var section = req.query.section || req.params.section || '';
  var year = req.query.year || req.params.year || '';

  var baseUrl = 'http://stjornartidindi.is/AdvertList.aspx?ID='

  var sections = {
    A: '8723EDEE-207A-43CE-A595-F93106265B77&view=1&value=',
    B: '7F3926F3-992D-4211-903D-D4F28F1DC87A&view=1&value=',
    C: '635C5F68-D665-4E92-B616-789884E1018A&view=1&value='
  };

  if (section === '' || !(section in sections)) {
    return res.json(431, {
      error: 'Missing section. The available sections are A, B and C'
    });
  }

  var url = baseUrl + sections[section] + year;

  request.get({
    headers: {'User-Agent': h.browser()},
    url: url
  }, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      return res.json(500);
    }

    var $ = cheerio.load(body);

    var results = $('#adDataGrid table').map(function(i, element) {
      var titleElement = $(element)
        .find('.table_label')
        .first();

      var nr = titleElement
        .text()
        .replace(/\r/g, '')
        .replace(/\n/g, '')
        .replace(/\t/g, '');

      var link = (
        'http://stjornartidindi.is/' + titleElement.find('a').attr('href')
      );

      // We're done using the title element. Let's delete it so we can work
      // with this shitty markup and get the description from it.

      $(element).find('.table_label').remove();

      var text = $(element)
        .find('td')
        .text()
        .replace(/\r/g, '')
        .replace(/\n/g, '')
        .replace(/\t/g, '')
        .replace(/Nr./g, '');

      var date = $(element)
      .find('.table_label[align=right]').first().text();

      var instance = {
        nr: nr,
        date: date,
        link: link,
        text: text
      };

      return instance;
    });

    return res.json({results: results});
  });
});
