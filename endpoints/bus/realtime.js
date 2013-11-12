var h = require('../../lib/helpers.js'),
    request = require('request'),
    app = require('../../server'),
    isn2wgs = require('isn2wgs');

app.get('/bus/realtime', function (req, res) {
    var data = req.query;

    request('http://straeto.is/bitar/bus/livemap/json.jsp', function (error, response, body) {
        if (error || response.statusCode !== 200) {
            return res.json(500, {
                error: 'The bus api is down or refuses to respond'
            });
        }

        var obj;
        try {
            obj = JSON.parse(body);
        } catch (error) {
            return res.json(500, {
                error: 'Something is wrong with the data provided from the data source'
            });
        }

        var activeBuses = [],
            requestedBuses = [];

        obj.routes.forEach(function (object) {
            activeBuses.push(object.id);
        });

        // provide backwards compatibility in the query and the result, this is
        // something that breaks a version, so should probably be adressed in v2
        var busstring = 'buses';
        if (data.busses) {
            data.buses = data.busses;
            busstring = 'busses';
        }


        if (data.buses) { //Post buses = 1,2,3,4,5
            requestedBuses = data.buses.split(',');

            for (var i in requestedBuses) { //Prevent requested to buses that are not available
                if (activeBuses.indexOf(requestedBuses[i]) === -1) {
                    requestedBuses.splice(requestedBuses.indexOf(requestedBuses[i]), 1);
                }
            }
        } else {
            //No bus was posted, use all active buses
            requestedBuses = activeBuses;
        }



        var objString = requestedBuses.join('%2C');

        request('http://straeto.is/bitar/bus/livemap/json.jsp?routes=' + objString, function (error, response, body) {

            if (error || response.statusCode !== 200) {
                return res.json(500, {
                    error: 'The bus api is down or refuses to respond'
                });
            }

            var data;
            try {
                data = JSON.parse(body);
            } catch (e) {
                return res.json(500, {
                    error: 'Something is wrong with the data provided from the data source'
                });
            }


            var routes = data.routes;

            var objRoutes = {
                results: []
            };
            routes.forEach(function (route) {

                var objRoute = {
                    busNr: route.id || '' // will be undefined if none are active
                };
                objRoute[busstring] = [];
                objRoutes.results.push(objRoute);

                var straetoBuses = route.busses;

                // straeto returns their data with the outdated 'busses' spelling
                if (!straetoBuses) {
                    return; // No buses active, eg. after schedule
                }

                //
                straetoBuses.forEach(function (bus) {

                    var location = isn2wgs(bus.X, bus.Y),
                        oneRoute = {
                            'unixTime': Date.parse(bus.TIMESTAMPREAL) / 1000,
                            'x': location.lat,
                            'y': location.lng,
                            'from': bus.FROMSTOP,
                            'to': bus.TOSTOP
                        };
                    objRoute[busstring].push(oneRoute);

                });

            });
            return res.json(objRoutes);
        });
    });
});
