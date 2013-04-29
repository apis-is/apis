exports.currency = {
	USD : {
		short: 'USD',
		long: 'Bandarískur dalur'
	},
	DKK: {
		short: 'DKK',
		long: 'Dönsk króna'
	},
	EUR: {
		short: 'EUR',
		long: 'Evra'
	},
	CAD: {
		short: 'CAD',
		long: 'Kanadískur dalur'
	},
	NOK: {
		short: 'NOK',
		long: 'Norsk króna'
	},
	GBP: {
		short: 'GBP',
		long: 'Sterlingspund'
	},
	CHF: {
		short: 'CHF',
		long: 'Svissneskur franki'
	},
	SEK: {
		short: 'SEK',
		long: 'Sænsk króna'
	},
	TWI: {
		short: 'TWI',
		long: 'Trade Weighted Index'
	},
	XDR: {
		short: 'XDR',
		long: 'Gengisvísitala'
	},
	ISK: {
		short: 'ISK',
		long: 'Íslensk króna'
	},
	JPY: {
		short: 'JPY',
		long: 'Japanskt Yen'
	}
}

/**
 * Combines two objects into one
 * @return Obj
 */
exports.mergeObjects = function(obj1, obj2) {
	var obj = {};

	for (var x in obj1)
	if (obj1.hasOwnProperty(x))
		obj[x] = obj1[x];

	for (var x in obj2)
	if (obj2.hasOwnProperty(x))
		obj[x] = obj2[x];

	return obj;
}

/**
 * Returns random valid browser string
 * @return String
 */
exports.browser = function(){
	var browsers = [
		'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
		'Mozilla/5.0 (X11; Linux amd64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.24 Safari/535.1',
		'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.24 Safari/535.1',
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.24 Safari/535.1',
		'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:14.0) Gecko/20120405 Firefox/14.0a1',
		'Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20120405 Firefox/14.0a1',
		'Mozilla/5.0 (Windows NT 5.1; rv:14.0) Gecko/20120405 Firefox/14.0a1',
		'Mozilla/6.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1',
		'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1',
		'Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1'
	];

	return browsers[Math.floor(Math.random()*browsers.length)];
}

/**
 * Logs errors and echoes them to the console
 */
exports.logError = function(error,stack){
	//var data = {error:error,stack:stack,timestamp:h.mysqlTimestamp()};
	console.log(error);
	console.log(stack)
	return true;
}

/**
 * Logs endpoint visits
 */
exports.logVisit = function(endpoint,data,testMode){
	// 	var data = {endpoint:endpoint,data:JSON.stringify(data),timestamp:h.mysqlTimestamp(),test:1}
	return true;
}

/**
 * Function to change strange icelandic lat and lng points to the real thing
 * http://kort.samsyn.is/api/api/v2/Example/Example12.aspx
 * http://kort.samsyn.is/api/SiteWatch.aspx?v=2&key=Bus49fVdg
 */
exports.ISN93_To_WGS84 = function(q,p){
	q = parseFloat(q);
	p = parseFloat(p);
	q=q-500000;
	p=p-500000;
	var m = Math.pow(Math.sqrt(q*q+Math.pow(2982044.27322585-p,2))/11616778.382033,1.10334624954392);
	var o = 1.5707963267949-(2*Math.atan(m));
	var l = o;
	var k = 0.0818191913305*Math.sin(l);o=1.5707963267949-2*Math.atan(m*Math.pow(((1-k)/(1+k)),0.04090959566525));
	while(o-l>0.000001){
		l = o;
		k = 0.0818191913305*Math.sin(l);
		o = 1.5707963267949-2*Math.atan(m*Math.pow(((1-k)/(1+k)),0.04090959566525))
	}
	return {
		lat:Math.round((o*57.2957795130823)*1000000)/1000000,
		lng:Math.round(((((Math.atan(q/(2982044.27322585-p)))*57.2957795130823)/0.90633380084752)-19)*1000000)/1000000
	};
}

/**
 * Function to change lat and lng points to strange icelandic location points
 * //http://kort.samsyn.is/api/api/v2/Example/Example12.aspx
 * //http://kort.samsyn.is/api/SiteWatch.aspx?v=2&key=Bus49fVdg
 */
exports.WGS84_To_ISN93=function(l,m){
	l = parseFloat(l);
	m = parseFloat(m);
	var k=l*0.0174532925199433;
	var p=0.0818191913305*Math.sin(k);
	var o=11616778.382033*Math.pow(Math.tan(0.785398163397448-(k/2))/Math.pow((1-p)/(1+p),0.04090959566525),0.90633380084752);
	var q=(m+19)*0.0158185089469038;
	return {
		x:Math.round((500000+o*Math.sin(q))*1000)/1000,
		y:Math.round((3482044.27322585-o*Math.cos(q))*1000)/1000
	};
}