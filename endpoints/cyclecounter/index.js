var request = require('request'),
  parseString = require('xml2js').parseString,
  app = require('../../server');

app.get('/cyclecounter', function(req, res){
  this.timeout(4000);
  request.get({
    url: 'http://www.bicyclecounter.dk/BicycleCounter/GetCycleInfo?ran=1379500208853&StationId=235&LaneId=0'
    }, function(err, response, xml) {
      if(err || response.statusCode !== 200)
        return res.json(500,{error: 'www.bicyclecounter.dk refuses to respond or give back data'});

      var cyclecounter = [];
      parseString(xml, { explicitRoot: false }, function(err, result) {

        cyclecounter.push({
          DayCount: result.DayCount[0],
          YearCount: result.YearCount[0],
          Time: result.Time[0],
          Date: result.Date[0],
        });

        return res.json({results: cyclecounter});
      });
    }
  );
});
