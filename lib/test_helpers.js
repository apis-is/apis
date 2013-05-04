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
// always returns the same fields, so we'll just reuse this function for both cases
// (I may be going a bit overboard on this)
exports.testRequestHandlerForFields = function(done, fieldsToCheckFor, customCallback) {
    return function(err, res, body) {
        if (err) throw err;
        var json = JSON.parse(body);

        // Check for the presence of the results property
        assertResults(json);

        // Check for the presence of all expected fields
        assertPresenceOfFields(fieldsToCheckFor, json.results);

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
