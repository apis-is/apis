# International flights in Iceland

Source: [Keflavik Airport](https://kefairport.is/)

-  GET [/flight](https://apis.is/flight)
    - Currently v1
- GET [/flight/v1](https://apis.is/flight/v1)
    - v1 is a legacy version and will be replaced eventually by v2

Get a list of all international flights departing and arriving at Keflavik Airport today. 

| Parameters          | Description                        | Example                    |      Version    |
|---------------------|------------------------------------|----------------------------|-----------------|
| Language (optional) | The language to get the results in | 'en' or 'is'               |      v1         |
| Type     (optional) | The type of flights to fetch       | 'departures' or 'arrivals' |      v1         |
---