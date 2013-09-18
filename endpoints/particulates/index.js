var request = require('request'),
  parseString = require('xml2js').parseString,
  app = require('../../server');

app.get('/particulates', function(req, res){

  request.get({
    url: 'http://www.loft.rvk.is/xml/svifryk.xml'
    }, function(err, response, xml) {
      if(err || response.statusCode !== 200)
        return res.json(500,{error: 'www.loft.rvk.is refuses to respond or give back data'});

      var particulates = [];
      parseString(xml, { explicitRoot: false }, function(err, result) {

        particulates.push({
          PM10nuna: result.PM10nuna[0],
          PM10medaltal: result.PM10medaltal[0],
          Counter: result.Counter[0],
          Dags: result.Dags[0],
          nanariuppl: result.nanariuppl[0]
        });

        return res.json({results: particulates});
      });
    }
  );
});
