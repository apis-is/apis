//Incomplete

exports.setup = function(){
	server.get({path: '/house', version: '1.0.0'}, slash);
}

slash = function(req, res, next){
	res.charSet = 'utf8';
	var fnr = req.params.house;
	
	general_info(fnr,function(error,general) {
		if (error == "not found"){
			res.json(200,{found:false});
			return next();
		} else if(error){
			console.log(error.stack)
			res.json(500,{error:"Something went wrong on the server"});
			return next();
		}

		extended_info(fnr,function(error,extended){
			if(error){
				console.log(error.stack);
				res.json(500,{error:"Something went wrong on the server"});
				return next();
			}

			geocode(general.land.land_id,function(error,geo){
				if(error){
					console.log(error.stack);
					res.json(500,{error:"Something went wrong on the server"});
					return next();
				}

				var obj = {
					found: true,
					location: {
						x: geo.center.x,
						y: geo.center.y,
						latitude: geo.center.latitude,
						longitude: geo.center.longitude
					}, 
					land: {
						area: parseFloat(general.land.area,10), 
						type: general.land.land_type, 
						bbox: geo.bbox, 
						id: general.land.land_id
					}, 
					property: {
						year: parseInt(extended.year,10), 
						build_material: extended.building_material, 
						street: geo.properties.HEITI_NF,
						street_number: ""+geo.properties.HUSNR, 
						address: extended.name.substr(0,extended.name.length -8), 
						valuation_estimate: parseInt(general.house.property_value),
						id: parseInt(extended.id,10), 
						//"toilet_count": 1, 
						floor_count: extended.floor_count, 
						area: parseFloat(general.house.size), 
						insurance_estimate: parseFloat(general.house.fire_insurance_value,10),
						//"shower_count": 1, 
						status: extended.state, 
						//"elevator": false, 
						//"apartment_count": 3, 
						postal_code: geo.properties.POSTNR
					}, 
					
					map: {
						url: "http://geo.skra.is/geoserver/vefur/heinum/"+geo.properties.HEINUM, 
						id: geo.properties.HEINUM
					}, 
				}

				res.json(200,obj);
			});

		});
	});
}

function general_info(fastanr,callback) {

	if (fastanr[3] && fastanr[3] !=='-') fastanr = fastanr.slice(0,3)+'-'+fastanr.slice(3);

	var url = "http://skra.is/default.aspx?pageid=1000&streetname="+fastanr;

	request(url,function(error,res,body) {
		if (error) return callback(err);

		try {
			var $ = cheerio.load(body),
				ret = {house:{},land:{}};

			var keyMap = {
				"merking": "flag",
				"notkun": "facility_type",
				"byggar": "built",
				"birtst": "size",
				"fastmat": "property_value",
				"lodahlmat": "lodahlmat",
				"brunabotamat": "fire_insurance_value",
				"fasteignamat": "fasteignamat",
				//Land
				"Land": "land_id",
				"Notkun": "land_type",
				"Stærð": "area",
				"Staðgreinir": "location_id"
			};

			// Parse house/apartment
			var next = $('td:contains("'+fastanr+'")');

			while ( next != (next = next.next())) {
				var text = next.text()
				.replace(/\r/g,"")
				.replace(/\n/g,"")
				.trim();

				var key = next.attr("header");
				ret.house[keyMap[key] || key] = text;
			}

			var th = $(".resulttable.small th"),
				td = $(".resulttable.small td");

			// Parse land
			th.each(function(i) {
				var key = $(this).text();
				ret.land[keyMap[key] || key] = $(td[i]).text().trim();
			});

			if(Object.keys(ret.house).length){
				ret.land.area = ret.land.area.substr(0,ret.land.area.length -3);
				ret.house.size = ret.house.size.substr(0,ret.house.size.length -3);
				ret.house.property_value = ret.house.property_value.replace(/\./g,"");
				ret.house.fire_insurance_value = ret.house.fire_insurance_value.replace(/\./g,"");
			}

			callback(!Object.keys(ret.house).length && !Object.keys(ret.land).length && "not found",ret);
		} catch(e) { 
			callback(e); 
		}
	});
}

function extended_info(fastanr,callback) {

	if (fastanr[3] && fastanr[3] !=='-') fastanr = fastanr.slice(0,3)+'-'+fastanr.slice(3);

	var url = 'http://www.skra.is/default.aspx?pageid=957&fnum='+fastanr.replace("-","");

	request.post(url,function(error,res,body) {

		if (error) return callback(error);

		try {
			var $ = cheerio.load(body),
			ret = {};

			var keyMap = {
				"Eign": "property_type",
				"Fastanúmer": "id",
				"Heiti": "name",
				"Flokkun": "property_sub_type",
				"Bygging": "building",
				"Staða": "state",
				"Metið afskriftarár": "year",
				"Byggingarefni": "building_material",
				"Flatarmál (m2)": "area",
				"Íbúð í kjallara": "basement_apartment",
				"Geymsla o.fl.": "storage_space",
				"Aðstaða o.fl.": "facility_space",
				"Fjöldi sturta": "shower_count",
				"Fjöldi klósetta": "toilet_count",
				"Er lyfta í húsi?": "elevator",
				"Aðalhæð íbúðar": "main_floor",
				"Fjöldi hæða í íbúð": "floor_count",
				"Fjöldi íbúða í húsi": "appartment_count",
				"Matssvæði": "evaluation_area",
				"Undirmatssvæði": "sub_evaluation_area",
				"Fjöldi stæða í bílageymslu": "garage_parking_spot_count",
				"Fjöldi íbúða í fasteign": "appartments_count_in_property",
				"Lóð (hlutdeild eignar)": "land_area",
				"Íbúð á hæð": "apartment_on_floor",
				"Fjöldi baðkara": "number_of_bathtubs"
			};

			$("th").each(function() {
				if (this.next) {
					var key = $(this).text();
					ret[keyMap[key] || key] = $(this).next().text();
				}
			});

			callback(!Object.keys(ret).length && "Not Found",ret);

		} catch(e) { 
			callback(e); 
		}
	});
}

function geocode(landnr,callback) {
	var req = {
		url : "http://geo.skra.is/geoserver/wfs",
		method: "POST",
		form : {
			'service':'wfs',
			'version':'1.1.0',
			'request':'GetFeature',
			'typename':'fasteignaskra:VSTADF',
			'outputformat':'json',
			'filter':'<Filter><PropertyIsLike wildCard="*" singleChar="#" escapeChar="!"><PropertyName>fasteignaskra:LANDNR</PropertyName><Literal>'+landnr+'</Literal></PropertyIsLike></Filter>'
		}
	};
	request(req,function(error,res,body) {

		if (error) return callback(error);

		try {
			var ret = {};
			body = JSON.parse(body);

			var center = isn2wgs.apply(this,body.features[0].geometry.coordinates);

			ret.center = {
				x: body.features[0].geometry.coordinates[0],
				y: body.features[0].geometry.coordinates[1],
				latitude: center.latitude,
				longitude: center.longitude
			};

			var box = [isn2wgs(body.bbox[0],body.bbox[1]),isn2wgs(body.bbox[2],body.bbox[3])];

			ret.bbox = [
				{
					x: body.bbox[0],
					y: body.bbox[1],
					latitude: box[0].latitude,
					longitude: box[0].longitude
				},
				{
					x: body.bbox[2],
					y: body.bbox[3],
					lat: box[1].latitude,
					longitude: box[1].longitude
				},
			];

			ret.properties = body.features[0].properties;

			callback(null,ret);

		} catch(e) { 
			callback(e); 
		}
	});
}