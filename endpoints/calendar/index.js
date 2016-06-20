import app from '../../server'
import fridagar from 'fridagar'
import makeDebug from 'debug'
import moment from 'moment'
import { range } from 'lodash'

const debug = makeDebug('endpoint:calendar')

app.get('/calendar/', (req, res) => {
  return res.json({
    description: 'Returns if a given date range has or is a holiday',
    provider: 'https://www.npmjs.com/package/fridagar',
    available_endpoints: [
      '/calendar/:year',
      '/calendar/:year/:month',
      '/calendar/:year/:month/:day',
    ],
  })
})

app.get('/calendar/:year', (req, res) => {
  const year = Number.parseInt(req.params.year, 10)
  if (Number.isNaN(year)) {
    return res.status(400).json({ error: 'Year must be a number' })
  }

  const holidays = range(1, 13).reduce((sum, current) => {
    debug(`Getting year: ${year}, month: ${current}`)
    return sum.concat(fridagar.getHolidays(year, current))
  }, [])

  return res.json({
    results: holidays,
  })
})

app.get('/calendar/:year/:month', (req, res) => {
  const year = Number.parseInt(req.params.year, 10)
  const month = Number.parseInt(req.params.month, 10)

  if (Number.isNaN(year)) {
    return res.status(400).json({ error: 'Year must be a number' })
  }

  if (Number.isNaN(month)) {
    return res.status(400).json({ error: 'Month must be a number' })
  }

  const holidays = fridagar.getHolidays(year, month)

  return res.json({
    results: holidays,
  })
})

app.get('/calendar/:year/:month/:day', (req, res) => {
  const year = req.params.year
  const month = req.params.month
  const day = req.params.day

  if (!moment([year, month, day]).isValid()) {
    return res.status(400).json({ error: 'Not a valid date' })
  }

  const holidays = fridagar.getHolidays(year, month)

  const holiday = holidays.find((current) => {
    return current.date.toISOString().startsWith(`${year}-${month}-${day}`)
  })

  const results = holiday || {
    date: `${year}-${month}-${day}T00:00:00.000Z`,
    description: null,
    holiday: false,
  }

  return res.json({
    results: [results],
  })
})
