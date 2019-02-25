# Icelandic names

Source: [Icelandic National Registry](https://www.island.is/mannanofn/leit-ad-nafni/)

- GET [/names/:category](https://apis.is/names/:category)

Lists all approved Icelandic names. A search parameter can be used with each endpoint.

| Parameters | Description                  | Example                                                                                                                             |
|------------|------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| :category  | Which category to search for | [males](https://apis.is/names/males), [females](https://apis.is/names/females) or [middle names](https://apis.is/names/middlenames) |

- GET [/names/rejected/:category](https://apis.is/names/rejected/:category)

Lists all rejected Icelandic names. A search parameter can be used with each endpoint.

| Parameters | Description                  | Example                                                                                                                                                        |
|------------|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| :category  | Which category to search for | [males](https://apis.is/names/rejected/males), [females](https://apis.is/names/rejected/females) or [middle names](https://apis.is/names/rejected/middlenames) |

---
