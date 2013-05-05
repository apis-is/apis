var assert = require('assert'),
    config = require('../config');

function assertResults(json) {
    assert(json.results && typeof json.results.length !== "undefined", "Does not contain a 'results' field");
    assert(json.results.length > 0, "Results are empty");
};
function assertPresenceOfFields(fields, arr) {
    arr.forEach(function(result, i) {
        fields.forEach(function(field) {
            assert(typeof result[field] !== "undefined", "Missing field '" + field + "' in result #" + i);
        });
    });
};

/*
   Asserts that all fields provided are of the expected type (Date is a bit
   messy, since it will be a string until we actually try to parse it as a Date).
*/
function assertTypesOfFields(fields, arr) {
    arr.forEach(function(result, i) {
        for (var key in fields) {
            var type = fields[key],
                value = result[key],
                constructor = value.constructor;
            if (type === Date && !Number.isNaN(Date.parse(value))) {
                constructor = Date;
            }
            assert(constructor === type, "Field " + key + " should be " + type.name + ", but is " + constructor.name);
        }
    });
};

// always returns the same fields, so we'll just reuse this function for both cases
// (I may be going a bit overboard on this)
exports.testRequestHandlerForFields = function(done, fieldsToCheckFor, customCallback) {
    return function(err, res, body) {
        if (err) throw err;
        var json = JSON.parse(body);

        // Check for the presence of the results property
        assertResults(json);

        var fieldsIsObject = fieldsToCheckFor.constructor === Object;
        var fields = fieldsIsObject ? Object.keys(fieldsToCheckFor) : fieldsToCheckFor;

        // Check for the presence of all expected fields
        assertPresenceOfFields(fields, json.results);

        if (fieldsIsObject) {
            assertTypesOfFields(fieldsToCheckFor, json.results);
        }

        if (customCallback) {
            customCallback.call(null, json);
        }

        done();
    };
};
// Generate http request params for a particular endpoint
exports.testRequestParams = function(path, form) {
    return {
        url: "http://" + config.host + ":" + config.port + path,
        method: "GET",
        form: form,
        headers: [ "Content-type: application/json" ]
    };
};
exports.assertPresenceOfFields = assertPresenceOfFields;
