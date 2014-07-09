var request = require('request'),
    moment = require('moment'),
    parseString = require('xml2js').parseString,
    h = require('apis-helpers'),
    app = require('../../server');

var schedStruct = {
    title: '',
    originalTitle: '',
    shortDescription: '',
    description: '',
    startTime: 0,
    duration: 0,
    series: {
        episode: 0,
        series: 0
    },
    live: false,
    premier: false,
    aspectRatio: '',
    actors: ''
};

/* RUV */
app.get('/tv/ruv', function (req, res) {
    var url = 'http://muninn.ruv.is/files/xml/ruv/';

    if (req.params.date) {
        if (moment(req.params.date).isValid()) {
            var date = moment(req.params.date);
            // Example : http://muninn.ruv.is/files/xml/ruv/2013-06-11/
            url += date.format('YYYY-MM-DD');
        }
    }

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parseRuv(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    });
});

/* RUV Ithrottir*/
app.get('/tv/ruvithrottir', function (req, res) {
    var url = 'http://muninn.ruv.is/files/xml/ruvithrottir/';

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parseRuv(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    });
});

/* Stod 2 */
app.get('/tv/stod2', function (req, res) {
    var url = 'http://stod2.is/XML--dagskrar-feed/XML-Stod-2-dagurinn';

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parse365(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    })
});

/* Stod 2 Sport*/
app.get('/tv/stod2sport', function (req, res) {
    var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Sport-dagurinn';

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parse365(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    })
});

/* Stod 2 Sport 2*/
app.get('/tv/stod2sport2', function (req, res) {
    var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Sport-2-dagurinn';

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parse365(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    })
});

/* Stod 3*/
app.get('/tv/stod3', function (req, res) {
    var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-3-dagurinn';

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parse365(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    })
});

/* Stod 2 Bio */
app.get('/tv/stod2bio', function (req, res) {
    var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Bio-dagurinn';

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parse365(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    })
});

/* Stod 2 Gull */
app.get('/tv/stod2gull', function (req, res) {
    var url = 'http://www.stod2.is/XML--dagskrar-feed/XML-Stod-2-Extra-dagurinn';

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parse365(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    })
});

/* Skjar 1 */
app.get('/tv/skjar1', function (req, res) {
    var url = 'http://www.skjarinn.is/einn/dagskrarupplysingar/?channel_id=7&output_format=xml';

    request.get({
        headers: {'User-Agent': h.browser()},
        url: url
    }, function (error, response, body) {
        if (error) throw new Error(url + ' did not respond');

        parseSkjar1(function (data) {
            res.cache(1800).json(200, {
                results: data
            })
        }, body);
    })
});

/* Parse feed from Skjarinn */
var parseSkjar1 = function (callback, data) {
    parseString(data, function (err, result, title) {
        if (err) throw new Error("Parsing of XML failed");

        var schedule = [];
        
        for (var i = 0; i < result.schedule.service[0].event.length; ++i) {
            var event = result.schedule.service[0].event[i];
            if (moment().add('d',1).startOf('day').hour(6) > moment(event.$['start-time'])) {
                schedule.push(schedStruct = {
                    title: event.title[0],
                    originalTitle: event['original-title'][0],
                    duration: event.$.duration,
                    description: event.description[0],
                    shortDescription: event['short-description'][0],
                    live: event.live[0] == "yes" ? true : false,
                    premier: event.rerun[0] == "yes" ? false : true,
                    startTime: event.$['start-time'],
                    aspectRatio: event['aspect-ratio'][0].size[0],
                    series: {
                        episode: event.episode[0].$.number,
                        series: event.episode[0].$['number-of-episodes']
                    }
                })
            }
        }
        return callback(schedule);
    });
};

/* Parse feed's from 365 midlar */
var parse365 = function (callback, data) {
    parseString(data, function (err, result, title) {
        if (err) throw new Error("Parsing of XML failed");

        var schedule = [];

        for (var i = 0; i < result.schedule.event.length; ++i) {
            var event = result.schedule.event[i];

            schedule.push(schedStruct = {
                title: event.title[0],
                originalTitle: event.org_title[0],
                duration: event.$.duration,
                description: event.description[0],
                live: event.live[0].$.value == "true" ? true : false,
                premier: event.premier[0].$.value == "true" ? true : false,
                startTime: event.$.starttime,
                aspectRatio: event.aspectratio[0].$.value,
                series: {
                    episode: event.series ? event.series[0].$.episode : "",
                    series: event.series ? event.series[0].$.series : ""
                }
            })
        }
        return callback(schedule);
    });
};

/* Parse feed's from RUV */
var parseRuv = function (callback, data) {
    parseString(data, function (err, result, title) {
        if (err) throw new Error("Parsing of XML failed");

        var schedule = [];

        if (result.schedule.error) {
            return(callback(schedule))
        }

        for (var i = 0; i < result.schedule.service[0].event.length; ++i) {
            var event = result.schedule.service[0].event[i];
            schedule.push(schedStruct = {
                title: event.title[0],
                originalTitle: event['original-title'][0],
                duration: event.$.duration,
                description: event.description[0],
                shortDescription: event['short-description'][0],
                live: event.live[0] == "yes" ? true : false,
                premier: event.rerun[0] == "yes" ? false : true,
                startTime: event.$['start-time'],
                aspectRatio: event['aspect-ratio'][0].size[0],
                series: {
                    episode: event.episode[0].$.number,
                    series: event.episode[0].$['number-of-episodes']
                }
            })
        }
        return callback(schedule);
    });
};