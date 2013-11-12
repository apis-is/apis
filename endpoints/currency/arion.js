var request = require('request'),
    moment = require('moment'),
    h = require('../../lib/helpers.js'),
    app = require('../../server');

app.get('/currency/arion', function (req, res) {

    var toSend = 'm=GetCurrencies&beginDate=' + moment().subtract('days', 1).format('YYYY-MM-DD') + '&finalDate=' + moment().format('YYYY-MM-DD') + '&currencyType=AlmenntGengi&currenciesAvailable=ISK%2CUSD%2CGBP%2CEUR%2CCAD%2CDKK%2CNOK%2CSEK%2CCHF%2CJPY%2CXDR';

    request.get({
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'http://www.arionbanki.is/Webservice/PortalCurrency.ashx',
        body: toSend
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            return res.json(500, {
                error: 'www.arionbanki.is refuses to respond or give back data'
            });
        }

        var jsonObject = JSON.parse(body),
            currencies = [];

        jsonObject.forEach(function (object, i) {
            var changePer = parseFloat(object.LastValueChange) / parseFloat(object.MidValue),
                currency = {
                    shortName: object.Ticker,
                    longName: h.currency[object.Ticker].long,
                    value: object.MidValue,
                    askValue: object.AskValue,
                    bidValue: object.BidValue,
                    changeCur: object.LastValueChange,
                    changePer: changePer.toFixed(2),
                };

            if (currency.changePer === '-0.00') {
                currency.changePer = 0;
            }

            currencies.push(currency);
        });

        return res.json({
            results: currencies
        });
    });
});
