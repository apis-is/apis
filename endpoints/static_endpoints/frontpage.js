import app from '../../server';

app.get('/', function(req,res){
	res.redirect(301,'http://docs.apis.is')
});

app.post('/', function(req, res, next) {
	res.json({
    'info': {
      'english': 'Hey there! Check out docs.apis.is in your browser for mor info',
      'icelandic': 'Velkominn á apis.is! Kíktu á docs.apis.is í vafranum þínum fyrir frekari upplýsingar!'
    }
	});
});
