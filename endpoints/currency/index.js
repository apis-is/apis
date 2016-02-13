var request = require('request');
var moment = require('moment');
var app = require('../../server');

app.get('/currency', function(req, res){
    var provider = req.query.provider || 'arion';
    var providers = ['m5', 'arion', 'lb', 'borgun'];
    if (providers.indexOf(provider) >= 0) {
        return res.redirect(301,'/currency/'+ provider);
    } else {
        return res.status(404).json({error:'This provider does not exist',code:2});
    }
});
