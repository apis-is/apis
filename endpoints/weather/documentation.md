# Icelandic Weather

Source: [Icelandic Meteorological Office](http://vedur.is)

- GET [/weather/:source/:lang](https://apis.is/weather/:source/:lang)

Get weather information for Iceland.
Under 'Descriptions' you will find a list that will help you understand the output of the following endpoints.

| Parameters       | Description                          | Example                                        |
|------------------|--------------------------------------|------------------------------------------------|
| :type (required) | Type of information to get           | [forecasts](https://apis.is/weather/forecasts) |
| :lang            | Language of output, defaults to 'is' | [en](https://apis.is/weather/forecasts/en)     |

- GET [/weather/forecasts/:lang](https://apis.is/weather/forecasts/:lang)

| Parameters          | Description                          | Example                                        |
|---------------------|--------------------------------------|------------------------------------------------|
| :lang               | Language of output, defaults to 'is' | [en](https://apis.is/weather/forecasts/en)     |
| stations (required) | List of station numbers seperated by commas(,) or semicolons(;). See links below for more information. [Weather stations (icelandic)](http://www.vedur.is/vedur/stodvar) & [Weather stations (english)](http://en.vedur.is/weather/stations/) | |

- GET [/weather/observations/:lang](https://apis.is/weather/observations/:lang)

| Parameters          | Description                          | Example                                        |
|---------------------|--------------------------------------|------------------------------------------------|
| :lang               | Language of output, defaults to 'is' | [en](https://apis.is/weather/forecasts/en)     |
| stations (required) | List of station numbers seperated by commas(,) or semicolons(;). See links below for more information. [Weather stations (icelandic)](http://www.vedur.is/vedur/stodvar) & [Weather stations (english)](http://en.vedur.is/weather/stations/) | |
| time                | 1h (default) = Fetch data from automatic weather stations that are updated on the hour. 3h = Only fetch mixed data from manned and automatic weather stations that is updated every 3 hours. | |
| anytime             | 0 (default) = an error will be returned if current data is not available. 1 = last available numbers will be displayed, regardless of date. | |

- GET [/weather/texts](https://apis.is/weather/texts)

| Parameters       | Description                          | Example                                        |
|------------------|--------------------------------------|------------------------------------------------|
| types (required) | List of types seperated by commas(,) or semicolons(;). See 'Valid types' below for full list of valid type numbers and what they stand for. | |

---
