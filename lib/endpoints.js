/**
 * Registers an endpoint onto the server handle
 */
function register(endpoint,data){
	console.log('- '+endpoint);
	switch(endpoint){
		case 'frontpage':
			server.get({path: '/'}, data.getSlash);
			server.post({path: '/'}, data.postSlash);
			break;
		case 'bus':
			server.post({path: '/bus/search', version: '1.0.0'}, data.search);
			server.post({path: '/bus/realtime', version: '1.0.0'}, data.realtime);
			break;
		case 'sms':
			server.post({path: '/sms', version: '1.0.0'}, data.slash);
			break;
		case 'currency':
			server.post({path: '/currency', version: '1.0.0'}, data.slash);
			break;
		case 'currency.m5':
			server.get({path: '/currency/m5', version: '1.0.0'}, data.slash);
			break;
		case 'currency.arion':
			server.get({path: '/currency/arion', version: '1.0.0'}, data.slash);
			break;
		case 'company':
			server.post({path: '/company', version: '1.0.0'}, data.slash);
			break;
		case 'car':
			server.post({path: '/car', version: '1.0.0'}, data.slash);
			break;
		case 'flight':
			server.post({path: '/flight', version: '1.0.0'}, data.slash);
			break;
		case 'house':
			//Incomplete
			server.post({path: '/house', version: '1.0.0'}, data.slash);
			break;
		case 'word':
			//Incomplete
			server.post({path: '/word', version: '1.0.0'}, data.slash);
			break;
		case 'phone':
			server.post({path: '/phone', version: '1.0.0'}, function(req, res, next){
				res.json(410,{error:"This api endpoint has been closed and it will not be available in the foreseeable future."});
				return next();
			});
			server.post({path: '/phone', version: '2.0.0'}, function(req, res, next){
				res.json(410,{error:"This api endpoint has been closed and it will not be available in the foreseeable future."});
				return next();
			});
			break;
		case 'help_out':
			server.post({path: '/help_out', version: '1.0.0'}, function(req, res, next){
				res.json(200,{message:'Send us mail: apis@apis.is ,thanks for your interest!'});
			});
			break;
		default:
			break;
	}
}

/**
 * Loads upp all the required endpoints
 */
exports.load = function(){
	console.log('Registering endpoints:');
	//Load all endpoints in the endpoints folder
 	//walk is blocking on purpose because the server can't listen yet
	fileModule.walk('./endpoints', function(a, dirPath, dirs, files){
		if(files){
			files.forEach(function(file,key){
				var fileName = file.replace('/index.js','')
									.replace('.js','')
									.replace('endpoints/','')
									.replace('/','.'),
	 				requiredData = require('../'+file);
	 			register(fileName,requiredData);
			})
		}
		
	});

	//Register endpoins that do not have file associated.
	register('phone',null);
	register('help_out',null);
}