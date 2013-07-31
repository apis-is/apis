# [APIs.is](http://apis.is) - Endpoints for Everyone!

The purpose of [APIs.is](http://apis.is) is to make data readily available to anyone interested. All data that is delivered through APIs.is is JSON formatted and scraped fron open public websites.

**Don't hesitate to lend a hand - All knowledge and help is much appreciated!**

## Tests

As is, only integration tests are provided and to run them, simply enter the following command:

```sh
$ node_modules/mocha/bin/mocha test/integration`
```

## Adding a new Endpoint

The service does not store any information so that all data is gathered on runtime and is then disregarded immediately.

### Step by Step

1. View current endpoints for structure and hierarchy.
2. Add a new folder to the `endpoints/` directory with the name of your endpoint.
3. In that folder should be at least one file called `index.js` in which is the `exports`object has a function called `setup` and accepts one argument called `server`:

```javascript
exports.setup = function (server) {
	server.get({
		path: '/name-of-endpoint',
		version: '1.0.0'
	}, function (request, response, next) {
		// Do your dark magic...
	});
};
```

### Additional Requirement

Add [integration tests](http://en.wikipedia.org/wiki/Integration_testing) to the endpoint by creating a file called `integration_test.js` inside a `tests/` folder within your endpoint directory. For reference, please take a look add one of the integration tests.

### Helpful Pointers

- Endpoints can implement almost any node module.
- Information on how to handle requests and responses can be found [here](http://mcavage.github.io/node-restify).
- It is much appreciated that endpoints are thoroughly documented and written with care.
- Issues are  managed by the [GitHub issue tracker](https://github.com/kristjanmik/apis/issues).
- Enjoy!