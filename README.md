# [APIs.is](http://apis.is) - Making data pretty since 2012!

[![Codeship](https://img.shields.io/codeship/7c0ce5a0-9901-0132-893b-365d53813970/master.svg)](https://codeship.com/projects/63542)
[![Greenkeeper badge](https://badges.greenkeeper.io/apis-is/apis.svg)](https://greenkeeper.io/)

The purpose of [APIs.is](http://apis.is) is to make data readily available to anyone interested. All data that is delivered through APIs.is is JSON formatted and scraped from open public websites.

The code that is running the service is open source under the [MIT licence](https://en.wikipedia.org/wiki/MIT_License). The platform itself is hosted on a load balanced setup by [Advania](https://www.advania.com/).

**Don't hesitate to lend a hand - All knowledge and help is much appreciated!**

## Maintainers

[@kristjanmik](https://github.com/kristjanmik/)

[@benediktvaldez](https://github.com/benediktvaldez/)

[@koddsson](https://github.com/koddsson/)

[@MiniGod](https://github.com/minigod/)

## Running locally

To run the project locally, first clone this repository...
```sh
$ git clone https://github.com/apis-is/apis.git
```

.... install the dependencies and run the project.

```sh
$ npm install
[Bunch of output]
$ npm run
```

## Tests

To run the tests:
```sh
$ npm test
```

The tests utilize a man-in-the-middle library called [nock](https://github.com/node-nock/nock) that
intercepts requests that the tests made and respond with data from disk. The data was generated using
the [record feature](https://github.com/node-nock/nock#recording) and saved in [`mock-data.json`](mock-data.json).

If a endpoints data source has changed and the we need to re-record this data we can simply set the
env variable `RECORD_MOCK_DATA` to a truthy value and run the tests. This will disable nock in the tests
and make requests to each endpoints data source and save that to disk.

```sh
RECORD_MOCK_DATA=true npm test
```

Newly added endpoints should mock the endpoints data source using the `nock` API since this initial
data mocking was only made to help migrate to a mocking library. See the [original PR](https://github.com/apis-is/apis/pull/376)
for more info.

## Adding a new Endpoint

### Step by Step

1. View current endpoints for structure and hierarchy.
2. Add a new folder to the `endpoints/` directory with the name of your endpoint.
3. The file will be loaded automatically. Remember to require the server. Bare minimum example endpoint:

```javascript
const app = require('../../server');

app.get('/path', (req,res) => {
  //Sends out empty json object
  return res.json({});
});
```

### Additional requirements

Add integration tests to the endpoint by creating a file called `integration_test.js` inside a `tests/` folder within your endpoint directory. For reference, please take a look at one of the integration tests.

Add documentation for your endpoint to the `gh-pages` branch of this repo.

### More servers

To ensure close to zero downtime, the plan is to start up more workers/servers around the world so that projects relying on this service will not be affected. Want to help out with that? Feel free to contact us by opening a [issue](https://github.com/apis-is/apis/issues/new).

### Helpful pointers

- Endpoints can implement any node module, but try to use the ones that are already included in the project.
- Information on how to handle requests and responses can be found [here](http://expressjs.com/api.html).
- It is much appreciated that endpoints are thoroughly documented and written with care.
- Issues are managed by the [GitHub issue tracker](https://github.com/apis-is/apis/issues).
- Have fun and eat some cake! (preferrably just some plain vanilla cake, but whatever floats your boat)
