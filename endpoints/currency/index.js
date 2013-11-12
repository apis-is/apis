var request = require('request'),
    moment = require('moment'),
    app = require('../../server');

app.get('/currency', function (req, res) {
    var provider = req.query.provider || 'arion';
    var providers = ['m5', 'arion', 'lb'];
    if (providers.indexOf(provider) >= 0) {
        return res.redirect(301, '/currency/' + provider);
    } else {
        return res.json(404, {
            error: 'This provider does not exist',
            code: 2
        });
    }
});
