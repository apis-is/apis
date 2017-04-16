[ ![Codeship Status for kristjanmik/apis](https://img.shields.io/codeship/7c0ce5a0-9901-0132-893b-365d53813970/v2.svg)](https://codeship.com/projects/63542)
[![Coverage Status](https://coveralls.io/repos/apis-is/apis/badge.svg?branch=v2)](https://coveralls.io/r/apis-is/apis?branch=v2)
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
git clone https://github.com/apis-is/apis
cd apis/
git checkout v2
npm install
gulp watch
```

Now gulp will be running express in the background restarting it, rebuilding all code and running tests when any change is detected.
