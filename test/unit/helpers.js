var helpers = require('../../lib/helpers.js');
var assert = require('assert');

describe('deArrayfy', function () {

    it('should not change single item variables in objects', function () {

        var object = {
            foo: 'foo'
        };

        helpers.deArrayfy(object);
        assert.equal('foo', object.foo);
    });

    it('should change 1 item array member to single item variables', function () {

        var object = {
            foo: [1]
        };

        helpers.deArrayfy(object);
        assert.equal(false, Array.isArray(object.foo));
    });

    it('should not change two item array members', function () {

        var object = {
            foo: [1, 2]
        };

        helpers.deArrayfy(object);
        assert.equal(true, Array.isArray(object.foo));
    });

    it('should change 1 item array member in sub-objects to single item variables', function () {

        var object = {
            foo: {
                bar: [1]
            }
        };

        helpers.deArrayfy(object);
        assert.equal(false, Array.isArray(object.foo.bar));
    });

    it('should not change two item array members in sub-objects', function () {

        var object = {
            foo: {
                bar: [1, 2]
            }
        };

        helpers.deArrayfy(object);
        assert.equal(true, Array.isArray(object.foo.bar));
    });

    it('should change 1 item array member in sub-arrays to single item variables', function () {

        var object = {
            foo: {
                bar: [{
                    baz: [1]
                }]
            }
        };

        helpers.deArrayfy(object);
        assert.equal(false, Array.isArray(object.foo.bar));
        assert.equal(false, Array.isArray(object.foo.bar.baz));
    });

    it('should not change two item array members in sub-arrays', function () {

        var object = {
            foo: {
                bar: [{
                    baz: [1, 2]
                }, {
                    baz: [1, 2]
                }]
            }
        };

        helpers.deArrayfy(object);
        assert.equal(true, Array.isArray(object.foo.bar));
        assert.equal(true, Array.isArray(object.foo.bar[0].baz));
        assert.equal(true, Array.isArray(object.foo.bar[1].baz));
    });

    it('should change all 1 item arrays in the object to single item variables and leave single item variables unchanged', function () {

        var object = {
            foo: 'foo',
            bar: [1],
            baz: [1, 2],
            qux: {
                foo: 'foo',
                bar: [
                    [1, 2],
                    [1]
                ],
                baz: [1]
            }
        };

        helpers.deArrayfy(object);
        assert.equal(false, Array.isArray(object.bar));
        assert.equal(true, Array.isArray(object.baz));

        assert.equal(true, Array.isArray(object.qux.bar));
        assert.equal(false, Array.isArray(object.qux.baz));

        assert.equal('foo', object.qux.foo);
    });

});
