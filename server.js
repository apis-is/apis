var express = require('express'),
	app = module.exports = express(),
	config = require('./config'),
    fileModule = require('file');

app.use(express.bodyParser());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');

    if(req.method !== 'OPTIONS')
        return next();

    return res.send(200);
});

// app.on('uncaughtException', function (req, res, route, err) {
//     console.log("======== Uncaught exception =========");
//     console.log("In: ", req.url, req.method);
//     if (Object.keys(req.params).length > 0) {
//         console.log("Params: ", util.inspect(req.params).replace(/\n/g,''));
//     }
//     console.log("Headers: ", util.inspect(req.headers).replace(/\n/g,''));
//     console.log(err.stack);
//     res.send(new restify.InternalError(err, 'Internal error in endpoint, please let us know.'));
//     return (true);
// });

//Load all endpoints in the endpoints folder
fileModule.walkSync('./endpoints', function(dirPath, dirs, files){
    if(files && dirPath.indexOf("/test") < 0){
        files.forEach(function(file,key){
            require('./'+dirPath+'/'+file);
        });
    }
});


app.get('/',function(req,res){
    res.json({})
})


app.listen(config.port);
console.log('Server running at port: ' + config.port);