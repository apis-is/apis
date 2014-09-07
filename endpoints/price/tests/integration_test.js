var request = require('request');
var assert = require('assert');
var helpers = require('../../../lib/test_helpers.js');

describe('price', function() {
    // The only thing that changes is the form attribute, so why not just re-use the object
    var productFields = ["name", "unit", "units", "Group", "GroupDescription", "price_per_unit", "sales_units", "price_total", "discount"];
    this.timeout(4000);

    it("should return a single object containing correct fields", function(done) {
        var params = helpers.testRequestParams("/price/kronan?barcode=5690527190008");
        var resultHandler = helpers.testRequestHandlerForFields(done, productFields);
        request(params, resultHandler);
    });

});
