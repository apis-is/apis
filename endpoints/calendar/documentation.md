# Icelandic holidays and other special days

Source: [Node module fridagar](https://www.npmjs.com/package/fridagar)

- GET [/calendar/:year](https://apis.is/calendar/:year)
- GET [/calendar/:year/:month](https://apis.is/calendar/:year/:month)
- GET [/calendar/:year/:month/:day](https://apis.is/calendar/:year/:month/:day)

Returns if a given date range has or is a holiday.

| Parameters | Description                                   | Example                                           |
|------------|-----------------------------------------------|---------------------------------------------------|
| :year      | Returns all dates within given year           | [2018](https://apis.is/calendar/2018)             |
| :month     | Returns all dates within given year and month | [2018/12](https://apis.is/calendar/2018/12)       |
| :day       | Returns all dates within given date           | [2018/12/23](https://apis.is/calendar/2018/12/23) |

---
