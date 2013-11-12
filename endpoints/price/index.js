var request = require('request'),
    app = require('../../server');

app.get('/price/kronan', function (req, res) {

    var data = req.query;
    console.log(data);
    if (!data.barcode) {
        return res.json(400, {
            error: 'You must supply a barcode parameter!'
        });
    }

    request.get({
        url: 'http://appservice.kronan.is/KrAppVerdPerVoruJSON.ashx?BarcodeOrItem=' + data.barcode
    }, function (err, response, body) {
        if (err || response.statusCode !== 200) {
            return res.json(500, {
                error: 'The Krónan price api is down or refuses to respond'
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

        return res.json({
            results: [obj]
        });
    });
});
