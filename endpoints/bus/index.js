var request = require('request'),
    h = require('../../lib/helpers.js'),
    app = require('../../server');

app.post('/bus/search', function (req, res) {
    return res.json(404, {
        error: 'This api endpoint has been closed, because Bus.is changed its markup.'
    });
});
