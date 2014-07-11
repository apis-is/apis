var request = require('request'),
	h = require('apis-helpers'),
	app = require('../../server');


var Holiday = function () {
	
	// static/stable holidays
	this.staticHoliday = [];
	this.staticHoliday.push({ date: new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0), day: '1. janúar', name: 'Nýársdagur', isStorhatidardagur: true });
	this.staticHoliday.push({ date: new Date(new Date().getFullYear(), 4, 1, 0, 0, 0, 0), day: '1. maí', name: 'Alþjóðlegur frídagur verkafólks', isStorhatidardagur: false });
	this.staticHoliday.push({ date: new Date(new Date().getFullYear(), 5, 17, 0, 0, 0, 0), day: '17. júní', name: 'Þjóðhátíðardagur Íslands', isStorhatidardagur: true });
	this.staticHoliday.push({ date: new Date(new Date().getFullYear(), 11, 24, 0, 0, 0, 0), day: '24. desember', name: 'Aðfangadagur', isStorhatidardagur: true });
	this.staticHoliday.push({ date: new Date(new Date().getFullYear(), 11, 25, 0, 0, 0, 0), day: '25. desember', name: 'Jóladagur', isStorhatidardagur: true });
	this.staticHoliday.push({ date: new Date(new Date().getFullYear(), 11, 26, 0, 0, 0, 0), day: '26. desember', name: 'Annar í jólum', isStorhatidardagur: false });
	this.staticHoliday.push({ date: new Date(new Date().getFullYear(), 11, 31, 0, 0, 0, 0), day: '31. desember', name: 'Gamlársdagur', isStorhatidardagur: true });
	
	// https://www.assa.org.au/edm#List20
	this.paskadagar = [];
	this.paskadagar.push(new Date(2000, 3, 23, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2001, 3, 15, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2002, 2, 31, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2003, 3, 20, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2004, 3, 11, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2005, 2, 27, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2006, 3, 16, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2007, 3,  8, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2008, 2, 23, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2009, 3, 12, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2010, 3,  4, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2011, 3, 24, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2012, 3,  8, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2013, 2, 31, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2014, 3, 20, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2015, 3,  5, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2016, 2, 27, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2017, 3, 16, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2018, 3,  1, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2019, 3, 21, 0, 0, 0, 0));
	this.paskadagar.push(new Date(2020, 3, 12, 0, 0, 0, 0));
};

Holiday.prototype.compareYearDate = function (date1, date2) {
	if (date1 !== undefined && date2 !== undefined) {
		return (date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
	}
	return undefined;
};

Holiday.prototype.getEaster = function (year) {
	// Easter is the first Sunday after the first full moon after equinox in March
	for (var i = 0; i < this.paskadagar.length; i++) {
		if (year === this.paskadagar[i].getFullYear()) {
			return this.paskadagar[i];
		}
	}
	return undefined;
};
Holiday.prototype.getSumardagurinnFyrsti = function (year) {
	// Always the first Tuesday after 18th of April (from 19th to 25th)
	if (year !== undefined) {
		var d = new Date(year, 3, 19, 0, 0, 0, 0);
		// While the day is not Tuesday
		while (d.getDay() !== 4) {
			// Add one day
			d = this.addDays(d, 1);
		}
		return d;
	}
	return undefined;
};
Holiday.prototype.getFridagurVerslunarmanna = function (year) {
	// Always the first Monday in August
	if (year !== undefined) {
		var d = new Date(year, 7, 1, 0, 0, 0, 0);
		// While the day is not Monday
		while (d.getDay() !== 1) {
			// Add one day
			d = this.addDays(d, 1);
		}
		return d;
	}
	return undefined;
};

Holiday.prototype.addDays = function (date, days) {
	var d = new Date();
	d.setTime(date.getTime() + (days * 86400000));
	return d;
};

Holiday.prototype.isHoliday = function (date) {
	
	var itIsHoliday = false;
	
	// Check on static holidays
	for (var i = 0; itIsHoliday === false && i < this.staticHoliday.length; i++) {
		if (this.compareYearDate(date, this.staticHoliday[i].date)) {
			itIsHoliday = true;
		}
	}
	
	// Check on dynamic/unstable holidays
	
	var sumardagurinnFyrsti = this.getSumardagurinnFyrsti(date.getFullYear());// Sumardagurinn fyrsti (alltaf fyrsti fimmtudagurinn eftir 18. apríl (á tímabilinu frá 19.-25. apríl)) [2015:23. apríl,2016:21. apríl,2017:20. apríl,2018:19. apríl]
	if (this.compareYearDate(date, sumardagurinnFyrsti)) {
		itIsHoliday = true;
	}
	
	var fridagurVerslunarmanna = this.getFridagurVerslunarmanna(date.getFullYear());// Frídagur verslunarmanna (fyrsti mánudagur í ágúst)
	if (this.compareYearDate(date, fridagurVerslunarmanna)) {
		itIsHoliday = true;
	}
	
	// Páskadagur (fyrsta sunnudag eftir að tungl verði fullt næst eftir Vorjafndægur í mars (19.-21. mars))
	// Easter (first Sunday after the first full moon after equinox in March)
	var thatYearEaster = this.getEaster(date.getFullYear());
	
	if (thatYearEaster !== undefined) {
		
		var skirdagur = this.addDays(thatYearEaster, -3);// Skírdagur (síðasti fimmtudagur fyrir páskadag)
		var fostudagurinnLangi = this.addDays(thatYearEaster, -2);// Föstudagurinn langi (síðasti föstudagur fyrir páskadag) (Stóhátíðardagur)
		var annarPaskar = this.addDays(thatYearEaster, 1);// Annar í páskum (mánudagurinn eftir páska) (Stóhátíðardagur)
		var uppstigningardagur = this.addDays(thatYearEaster, 39);// Uppstigningardagur (fimmtudagur 39 dögum eftir páskadag) [2014:29. maí,2015:14. maí,2016:5. maí,2017:25. maí,2018:10. maí]
		var hvitasunnudagur = this.addDays(thatYearEaster, 49);// Hvítasunnudagur (sunnudagur 49 dögum eftir páskadag) (Stóhátíðardagur)
		var annarHvitasunnu = this.addDays(thatYearEaster, 50);// Annar í hvítasunnu (mánudagurinn eftir Hvítasunnudag)
		
		if (this.compareYearDate(date, thatYearEaster)) { itIsHoliday = true; }
		if (this.compareYearDate(date, skirdagur)) { itIsHoliday = true; }
		if (this.compareYearDate(date, fostudagurinnLangi)) { itIsHoliday = true; }
		if (this.compareYearDate(date, annarPaskar)) { itIsHoliday = true; }
		if (this.compareYearDate(date, uppstigningardagur)) { itIsHoliday = true; }
		if (this.compareYearDate(date, hvitasunnudagur)) { itIsHoliday = true; }
		if (this.compareYearDate(date, annarHvitasunnu)) { itIsHoliday = true; }
	}
	
	return itIsHoliday;
};

var holiday = new Holiday();
	
app.get('/holiday', function(req, res) {
	var strDate = req.query.date || '';
	
	if (!strDate) {
		date = new Date();
	}
	else {
		date = new Date(strDate);
	}
	
	var isItHoliday = holiday.isHoliday(date);
	
	return res.json({
		date: date,
		isHoliday: isItHoliday
	});
});
