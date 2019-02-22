# Icelandic access address (is: Staðfang)

Source [Icelandic National Registry](https://skra.is/einstaklingar/gagnagrusk/nidurhal/)

-  GET [/stadfang](https://apis.is/stadfang)

Lookup addresses in Iceland

NB: At least one of the following is required:  
`address`, `zipCode`, `street`, `number`, `letter`, `landNumber` or coordinates (`latitude` and `longitude`)

| Parameters | Description                                   | Example                                                                                        |
|------------|-----------------------------------------------|------------------------------------------------------------------------------------------------|
| Address    | Address                                       | [Ármúli 42](https://apis.is/stadfang/?address=Ármúli%2042)                                     |
| ZipCode    | Zip code                                      | [101](https://apis.is/stadfang/?zipCode=101)                                                   |
| Street     | Street name                                   | [Ármúla](https://apis.is/stadfang/?street=Ármúla)                                              |
| Number     | Street number (preferably used with `street`) | [Ármúla 1](https://apis.is/stadfang/?street=Ármúla&number=42)                                  |
| Letter     | Street letter (preferably used with `number`) | [Ármúla 1a](https://apis.is/stadfang/?street=Ármúla&number=1&letter=a)                         |
| LandNumber | Land number                                   | [103836](https://apis.is/stadfang/?landNumber=103836)                                          |
| Latitude   | Latitude (must be used with `longitude`)      | [64.1334712, -21.8742527](https://apis.is/stadfang/?latitude=64.1334712&longitude=-21.8742527) |
| Longitude  | Longitude (must be used with `latitude`)      | [64.1499828, -21.9432083](https://apis.is/stadfang/?latitude=64.1499828&longitude=-21.9432083) |
| Radius     | Radius distance in KM, default is '1.0'       | [0.2](https://apis.is/stadfang/?latitude=64.1334712&longitude=-21.8742527&radius=0.2)          |

---
