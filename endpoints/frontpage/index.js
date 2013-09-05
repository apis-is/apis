var app = require('../../server');

app.get('/', function(req, res) {
	return res.redirect(301,'http://docs.apis.is');
});

app.post('/', function(req, res) {
	return res.json({"info":"Velkominn á apis.is! Kíktu á docs.apis.is í vafranum þínum fyrir frekari upplýsingar!"});
});