var request = require('request');
var iconv = require('iconv-lite');
var $ = require('cheerio');
var h = require('apis-helpers');
var app = require('../../server');

var encoding = 'iso-8859-1';

function query_data(id, name, origin, microchip, callback) {
  // Encoding parameters so Icelandic characters will work
  // Hacking around to get ISO 8859-1 encoded string, pls unhack if you know better way.
  var encoded_name = encodeURIComponent(escape(name)).replace(/%25/g,"%");
  var encoded_origin = encodeURIComponent(escape(origin)).replace(/%25/g,"%");

  var headers = {
    'User-Agent': h.browser(),
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  var url = 'http://www.worldfengur.com/freezone_horse.jsp?c=EN';
  var form_data = 'fnr=' + id +
    '&nafn=' + encoded_name +
    '&uppruni=' + encoded_origin +
    '&ormerki=' + microchip +
    '&leitahnappur=Search+&leita=1';

  request.post({
    headers: headers,
    url: url,
    body: form_data,
    encoding: null
  }, function(error, response, body) {
    if(error || response.statusCode !== 200) {
      callback(error, response, []);
    }
    var body1 = iconv.decode(body,encoding);
    var data = $(body1);
    var fields = [];
    data.find('div.complete div table').each(function() {
      $(this).find('td').each(function() {
        fields.push($(this).text());
      });
    });
    callback(error, response, fields);
  });
}

function parse_data(fields) {
  var params = [
    null, //  0 id
    null, //  1 name_and_origin
    null, //  2 ueln
    null, //  3 date_of_birth
    null, //  4 color_code
    null, //  5 color
    null, //  6 country_located
    null, //  7 fate
    null, //  8 microchip
    null, //  9 father
    null  // 10 mother
  ];
  var labels = [
    'FEIF ID',                     //  0 id
    'Name and origin',             //  1 name_and_origin
    'UELN',                        //  2 ueln
    'Date of birth',               //  3 date_of_birth
    'Colour code',                 //  4 color_code
    'Colour ',                     //  5 color
    'Country of current location', //  6 country_located
    'Fate ',                       //  7 fate
    'Microchip',                   //  8 microchip
    'Sire',                        //  9 father
    'Dam'                          // 10 mother
  ];
  var temp = null; // oh the things I'm gonna do to you!
  // health checks along the way
  // - check if label is in fields
  // - make sure the next field doesn't hold one of the labels
  for (var i = 0; i < labels.length; i++) { 
    temp = fields.lastIndexOf(labels[i]);
    if (temp !== -1 && labels.lastIndexOf(fields[temp+1]) == -1) {
      if (fields[temp+1] !== '') {
        if (i < 9) {
          params[i] = fields[temp+1];
        } else {
          temp = fields[temp+1].split(' - ');
          params[i] = {
            id: temp[0],
            name_and_origin: temp[1]
          };
        }
      }
    }
  }
  var results = [];
  if (params[0] && params[1]) { // always single-record
    results.push({
      id: params[0],
      name_and_origin: params[1],
      ueln: params[2],
      date_of_birth: params[3],
      color_code: params[4],
      color: params[5],
      country_located: params[6],
      fate: params[7],
      microchip: params[8],
      father: params[9],
      mother: params[10]
    });
  } else { // check for multi-record
    var multi_records = false;
    var count_index = -1;
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].indexOf('Number: ') !== -1) {
        multi_records = true;
        count_index = i;
        break;
      }
    }
    if (multi_records) { // collect partial data
      var count = Number(fields[count_index].replace('Number: ',''));
      for (var i = 0; i < count; i++) {
        temp = fields[count_index + 1 + i*5].split(' - ');
        results.push({
          id: temp[0],
          name_and_origin: temp[1],
          ueln: null,
          date_of_birth: null,
          color_code: null,
          color: null,
          country_located: null,
          fate: null,
          microchip: null,
          father: null,
          mother: null
        });
      }
    }
  }
  return results;
}

function asyncLoop(obj) { // http://stackoverflow.com/a/7654602/2401628
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
    return res.status(431).json({
      error:'Please provide at least one of the following: id, name and origin, microchip'
    });
  }

  query_data(id, name, origin, microchip, function(error, response, fields) {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error:'www.worldfengur.com refuses to respond or give back data'
      });
    }
    var results = parse_data(fields);
    if (1 < results.length) {
      var complete_multi_results = [];
      asyncLoop({
        length: results.length,
        functionToLoop: function(loop, i) {
          setTimeout(function() {
            query_data(results[i]['id'], '', '', '', function(err, res, fields) {
              var single_result = parse_data(fields);
              complete_multi_results.push(single_result[0]);
              loop();
            });
          },2000);
        },
        callback: function() {
          var obj = {results: complete_multi_results};
          return res.cache().json(obj);
        }
      });
    } else {
      var obj = {results: results};
      return res.cache().json(obj);
    }
  });
});
