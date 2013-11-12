var app = require('../../server');

app.post('/bus/search', function (req, res) {
    res.json(404, {
        error: 'This api endpoint has been closed temporarily, because Bus.is changed its markup.'
    });
}); //Old

app.get('/bus/search', function (req, res) {
    res.json(404, {
        error: 'This api endpoint has been closed temporarily, because Bus.is changed its markup.'
    });
});
