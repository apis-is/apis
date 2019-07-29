# International flights in Iceland

Source: [Keflavik Airport](https://kefairport.is/)

-  GET [/flight](https://apis.is/flight)
    - Currently v1
- GET [/flight/v1](https://apis.is/flight/v1)
    - v1 is a legacy version and will be replaced eventually by v2
- GET [/flight/v2](https://apis.is/flight/v2)
    - Next version of flight API utilizing a whole bunch of new data


## V1 Parameters
Get a list of all international flights departing and arriving at Keflavik Airport today. 

| Parameters          | Description                        | Example                    |      Version    |
|---------------------|------------------------------------|----------------------------|-----------------|
| Language (optional) | The language to get the results in | 'en' or 'is'               |      v1         |
| Type     (optional) | The type of flights to fetch       | 'departures' or 'arrivals' |      v1         |
---


## V2 Parameters
Get a list of all international flights departing and arriving at Keflavik Airport today. 

| Parameters          | Description                        | Example                    |      Version    |
|---------------------|------------------------------------|----------------------------|-----------------|
| Language (optional) | The language to get the results in | 'en' or 'is'               |      v2         |
| Type     (optional) | The type of flights to fetch       | 'departures' or 'arrivals' |      v2         |
| dateFrom (optional) | Fetch flights after certain date   | '2019-12-31T00:00:00'      |      v2         |
| dateTo   (optional) | Fetch flights before certain date  | '2019-12-31T23:59:59'      |      v2         |
| airport  (optional) | Fetch flights connected to airport | 'KEF' or 'RKV'(IS airports)|      v2         |
---