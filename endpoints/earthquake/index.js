var request = require('request'),
    cheerio = require('cheerio'),
    browser = require('../../lib/helpers.js').browser,
    app = require('../../server');


/*
   This function only handles the request part and calls callback with
   the body
*/
var getEarthquakes = function (callback) {
    var params = {
        url: 'http://hraun.vedur.is/ja/skjalftar/skjlisti.html',
        headers: {
            'User-Agent': browser()
        },
        encoding: 'binary' // needed for some reason.. defaulting to ISO-8859-1
    };

    request(params, function (error, res, body) {
        if (res.statusCode !== 200) {
            return callback(new Error('HTTP error from endpoint, status code ' + res.statusCode));
        }

        return callback(error, body);
    });
};

/*
   This function only handles the DOM traversal part, and returns a
   fully formed list (synchronous).

   It should be pretty easy to split out each part of this parser into standalone
   functions, that could be unit tested (to make sure the data looks exactly like
   it's supposed to look like)
*/
var parseList = function (body) {
    var $ = cheerio.load(body);

    // currying of a function that parses a <td> with an icelandic number as a JS Number
    // used for the fieldsParser below
    var numberField = function (i) {
        return function ($children) {
            return +$children.eq(i).text().replace(',', '.');
        };
    };

    // for each row, all of this object's functions will be called to popoulate each
    // key in the generated object - they are all passed in the full array of
    // children (which are the cheerioed <td>s)
    var fieldsParser = {
        timestamp: function ($children) {
            // the fields are in this format: <td><a href>2015-12-30</a></td><td>21:31:24,0</td>
            var date = $children.eq(0).text() + ' ' + $children.eq(1).text();
            return new Date(date.split(',')[0]);
        },
        latitude: numberField(2),
        longitude: numberField(3),
        depth: numberField(4),
        size: numberField(5),
        quality: numberField(6),
        humanReadableLocation: function ($children) {
            // these are three <td> elements' text values combined.. there migth be a
            // cleaner way to do this, but I don't know how.
            var strObj = $children.slice(7, 10).map(function () {
                return $(this).text();
            });
            return Array.prototype.join.call(strObj, ' ').replace(/^\s*|\s*$/g, '');
        }
    };

    // This finds all the table rows in the list, except the first row, which
    // is a header row.
    return $('table').eq(2).find('tr').slice(1).map(function () {
        var $children = $(this).children(),
            obj = {};
        for (var key in fieldsParser) {
            obj[key] = fieldsParser[key]($children);
        }
        return obj;
    });
};


app.get('/earthquake/is', function (req, res, next) {
    getEarthquakes(function (error, body) {
        if (error) {
            return res.json(500, {
                error: error.toString()
            });
        }

        return res.json({
            results: parseList(body)
        });
    });
});
