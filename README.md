# [APIs.is](http://apis.is) - Making data pretty since 2012!

The purpose of [APIs.is](http://apis.is) is to make data readily available to anyone interested. All data that is delivered through APIs.is is JSON formatted and scraped fron open public websites.

The code that is running the service is open source under the MIT licence so it can be used freely. The platform itself is hosted on a load balanced setup by [GreenQloud](http://www.greenqloud.com) to be as antifragile as possible. The hosted service does not store any information so that all data is gathered on runtime and is then disregarded immediately.

**Don't hesitate to lend a hand - All knowledge and help is much appreciated!**

##Maintainers

[@kristjanmik](https://github.com/kristjanmik/)

[@arnorhs](https://github.com/arnorhs/)

[@benediktvaldez](https://github.com/benediktvaldez)


[![Build Status](https://travis-ci.org/kristjanmik/apis.png?branch=master)](https://travis-ci.org/kristjanmik/apis)


## Tests

Currently there are two types of tests, integration and unit tests. All tests are created using [Mocha](http://visionmedia.github.io/mocha/).

To run the integration tests:
```sh
 node_modules/mocha/bin/mocha test/integration

 or

 mocha test/integration
```

To run the unit tests:
```sh
 node_modules/mocha/bin/mocha test/unit
 
 or
 
 mocha test/unit
```

## Adding a new Endpoint

### Step by Step

1. View current endpoints for structure and hierarchy.
2. Add a new folder to the `endpoints/` directory with the name of your endpoint.
3. The file will be loaded automatically. Remember to require the server. Bare minimum example endpoint:

```javascript
var app = require('../../server');

app.get('/path',function(req,res){
    return res.json({}); //Sends out empty json object
});
```

### Additional Requirement

Add [integration tests](http://en.wikipedia.org/wiki/Integration_testing) to the endpoint by creating a file called `integration_test.js` inside a `tests/` folder within your endpoint directory. For reference, please take a look add one of the integration tests.

Add [documentation](https://github.com/kristjanmik/apis-docs) for your endpoint

### More servers

To have close to zero downtime it is in the pipeline to start up more workers/servers around the world so that stuff relying on the apis.is service will not get affected. Want to help out with that? Feel free to send us a [line](mailto:apis@apis.is)!

### Helpful Pointers

- Endpoints can implement any node module.
- Information on how to handle requests and responses can be found [here](http://expressjs.com/api.html).
- It is much appreciated that endpoints are thoroughly documented and written with care.
- Issues are  managed by the [GitHub issue tracker](https://github.com/kristjanmik/apis/issues).
- Enjoy!