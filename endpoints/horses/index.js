var request = require('request');
var iconv = require('iconv-lite');
var $ = require('cheerio');
var h = require('apis-helpers');
var app = require('../../server');

function query_data(id, name, origin, microchip, callback) {
  var url = 'http://www.worldfengur.com/freezone_horse.jsp?c=EN';
  var headers = {
    'User-Agent': h.browser(),
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  // Encoding parameters so Icelandic characters will work
  // Hacking around to get ISO 8859-1 encoded string, pls unhack if you know better way
  var encoded_name = encodeURIComponent(escape(name)).replace(/%25/g,"%");
  var encoded_origin = encodeURIComponent(escape(origin)).replace(/%25/g,"%");
  var form_data = (
    'fnr=' + id +
    '&nafn=' + encoded_name +
    '&uppruni=' + encoded_origin +
    '&ormerki=' + microchip +
    '&leitahnappur=Search+&leita=1'
  );

  request.post({
    headers: headers,
    url: url,
    body: form_data,
    encoding: null
  }, function(error, response, body) {
    if(error || response.statusCode !== 200) {
      callback(error, response, '');
    }
    var html_page = iconv.decode(body, 'iso-8859-1');
    callback(error, response, html_page);
  });
}

function parse_data(html_page) {
  var data = $(html_page);
  // td_elements:
  // is a list of text strings from all td elements in the returned html_page
  // we find data from the list by searching for key labels
  // we assume the next value in the list after a key label is a corresponding value
  var td_elements = [];
  data.find('div.complete div table').each(function() {
    $(this).find('td').each(function() {
      td_elements.push($(this).text());
    });
  });
  // params:
  // name is the name of a single param
  // label is the label used on the webpage for a given param
  // value is the value of a given param, and null if it wasn't found in td_elements
  var params = [
    {name: 'id',              label: 'FEIF ID',                     value: null},
    {name: 'name_and_origin', label: 'Name and origin',             value: null},
    {name: 'ueln',            label: 'UELN',                        value: null},
    {name: 'date_of_birth',   label: 'Date of birth',               value: null},
    {name: 'color_code',      label: 'Colour code',                 value: null},
    {name: 'color',           label: 'Colour ',                     value: null},
    {name: 'country_located', label: 'Country of current location', value: null},
    {name: 'fate',            label: 'Fate ',                       value: null},
    {name: 'microchip',       label: 'Microchip',                   value: null},
    {name: 'father',          label: 'Sire',                        value: null},
    {name: 'mother',          label: 'Dam',                         value: null},
  ];
  var labels = params.map(function(x){return x['label'];});

  // we do the following health checks
  // - check if label is in td_elements
  // - make sure the next field doesn't hold one of the labels
  // - also make sure it isn't ''
  // Note: we use 'lastIndexOf' because td_elements from the post form are included in td_elements
  //       which are identical to some of our labels, this isn't an issue though because the next
  //       value in td_elements for those elements is always ''
  for (var i = 0; i < labels.length; i++) { 
    var label_location = td_elements.lastIndexOf(labels[i]);
    if (label_location !== -1 && labels.lastIndexOf(td_elements[label_location+1]) == -1) {
      if (td_elements[label_location+1] !== '') {
        if (i < 9) { // first nine params values are strings
          params[i]['value'] = td_elements[label_location+1];
        } else { // father and mother params are objects
          // parent strings look like this: '{id} - {name_and_origin}'
          var parent_info = td_elements[label_location+1].split(' - ');
          params[i]['value'] = {
            id: parent_info[0],
            name_and_origin: parent_info[1]
          };
        }
      }
    }
  }

  var results = [];
  if (params[0]['value'] && params[1]['value']) {
    // here we successfully found id and name of horse
    // we 'correctly' assume we received a single-record result
    var result = {};
    for (var i = 0; i < params.length; i++) {
      result[params[i]['name']] = params[i]['value'];
    }
    results.push(result);
  } else {
    // there is a chance we received a multi-records result
    // then we have string like 'Number: 2' in td_elements if number of records were 2
    // we check if multi-records are in result
    var multi_records = false;
    var count_index = -1;
    for (var i = 0; i < td_elements.length; i++) {
      if (td_elements[i].indexOf('Number: ') === 0) {
        multi_records = true;
        count_index = i;
        break;
      }
    }
    if (multi_records) {
      // for multi-records we receive less data for each horse than in single-record result
      // we get 5 td elements for each horse, explaining the i*5 below
      // we fish out only id and name for each horse and return list of those
      var num_records = Number(td_elements[count_index].replace('Number: ',''));
      for (var i = 0; i < num_records; i++) {
        var horse_info = td_elements[count_index + 1 + i*5].split(' - ');
        results.push({
          id: horse_info[0],
          name_and_origin: horse_info[1],
        });
      }
    }
  }
  return results;
}

function asyncLoop(obj) {
  // http://stackoverflow.com/a/7654602/2401628
  var i = -1;
  var loop = function() {
    i++;
    if (i==obj.length) {
      obj.callback();
      return;
    }
    obj.functionToLoop(loop, i);
  }
  loop(); // init
}

app.get('/horses', function(req, res){
  var id = req.query.id || '';
  var name = req.query.name || '';
  var origin = req.query.origin || '';
  var microchip = req.query.microchip || '';

  if (!id && !(name && origin) && !microchip) {
    return res.status(400).json({
      error:'Please provide at least one of the following: id, name and origin or microchip'
    });
  }

  query_data(id, name, origin, microchip, function(error, response, html_page) {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error:'www.worldfengur.com refuses to respond or give back data'
      });
    }
    var results = parse_data(html_page);
    if (results.length > 1) {
      // we receive less data for multi-records, so we do additional query for each result
      // which we 'correctly' assume returns a single-record result
      var complete_multi_results = [];
      asyncLoop({
        length: results.length,
        functionToLoop: function(loop, i) {
          query_data(results[i]['id'], '', '', '', function(err, res, fields) {
            var single_result = parse_data(fields)[0];
            complete_multi_results.push(single_result);
            loop();
          });
        },
        callback: function() {
          return res.cache().json({results: complete_multi_results});
        }
      });
    } else {
      return res.cache().json({results: results});
    }
  });
});
