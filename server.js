var express = require('express'),
    app = module.exports = express(),
	config = require('./config'),
    fileModule = require('file');

//Get the posted params with req.body.KEY
app.use(express.bodyParser());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');

    if(req.method !== 'OPTIONS')
        return next();

    return res.send(200);
});

app.use(function(err, req, res, next){
    console.error(err);
    res.send('Fail Whale, yo.');
});

//Load all endpoints in the endpoints folder
fileModule.walkSync('./endpoints', function(dirPath, dirs, files){
    if(files && dirPath.indexOf("/test") < 0){
        files.forEach(function(file,key){
            require('./'+dirPath+'/'+file);
        });
    }
});

app.listen(config.port);
console.log('Server running at port: ' + config.port);