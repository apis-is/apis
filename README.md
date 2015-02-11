[![Build Status](https://travis-ci.org/kristjanmik/apis.png?branch=v2)](https://travis-ci.org/kristjanmik/apis)
# [APIs.is](http://apis.is) - Making data pretty since 2012!

The purpose of [APIs.is](http://apis.is) is to make data readily available masterrto anyone interested. All data that is delivered through APIs.is is JSON formatted and scraped from open public websites.

The code that is running the service is open source under the [MIT licence](https://en.wikipedia.org/wiki/MIT_License). The platform itself is hosted on a load balanced setup by [GreenQloud](http://www.greenqloud.com) to be as antifragile as possible. The hosted service does not store any information, so all data is gathered on runtime and disregarded immediately afterwards.

**Don't hesitate to lend a hand - All knowledge and help is much appreciated!**

## Maintainers

[@kristjanmik](https://github.com/kristjanmik/)

[@benediktvaldez](https://github.com/benediktvaldez/)

[@koddsson](https://github.com/koddsson/)

[@MiniGod](https://github.com/minigod/)

## Local development

The following commands should get you up and running.

```
git clone https://github.com/kristjanmik/apis/
cd apis/
npm install
gulp watch
```

Now gulp will be running express in the background restarting it, rebuilding all code and running tests when any change is detected.

## Roadmap to APIs 2.0

- APIs 2.0 [#80](https://github.com/kristjanmik/apis/issues/80)
- Caching headers mentioned in [#74](https://github.com/kristjanmik/apis/issues/74)
- Version handling [#18](https://github.com/kristjanmik/apis/issues/18)
- Implement jshintrc and/or similar tools [#103](https://github.com/kristjanmik/apis/issues/103)
- Code linting and beautification [#77](https://github.com/kristjanmik/apis/issues/77)
- status.apis.is - display endpoint status/uptime etc. [#117](https://github.com/kristjanmik/apis/issues/117)
- Implement version control for endpoints [#119](https://github.com/kristjanmik/apis/issues/119)
- Describe how to create new endpoints [#120](https://github.com/kristjanmik/apis/issues/120)
- Logo for the APIs project [#121](https://github.com/kristjanmik/apis/issues/121)
