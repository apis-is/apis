import app from '../../server'
import fridagar from 'fridagar'
import makeDebug from 'debug'
import { range, isString } from 'lodash'

const debug = makeDebug('endpoint:calendar')

const canBeInt = intLike => {
  const num = Number.parseInt(intLike, 10)
  return !Number.isNaN(num)
}

export const normalizeParams = (year, month, day) => {
  // If string parsing failed, reject the promise
  if (isString(year) && !canBeInt(year)) return { error: 'Year must be a number' }
  if (isString(month) && !canBeInt(month)) return { error: 'Month must be a number' }
  if (isString(day) && !canBeInt(day)) return { error: 'Day must be a number' }

  return { year, month, day }
}

const lookupHolidays = (yearStr, monthStr, dayStr) => new Promise((resolve, reject) => {
  const { year, month, day, error } = normalizeParams(yearStr, monthStr, dayStr)

  // Reject promise with relevant error when in error states
  if (error) reject({ error })
  if (!year) reject({ error: 'No year was provided' })
  if (!year && !month && !day) reject({ error: 'No parameters were provided' })

  if (year && !month && !day) {
    // Year
    const holidays = range(1, 13).reduce((sum, current) => {
      debug(`Getting year: ${year}, month: ${current}`)
      return sum.concat(fridagar.getHolidays(year, current))
    }, [])
    resolve(holidays)
  } else if (year && month && !day) {
    // Year, Month
    resolve(fridagar.getHolidays(year, month))
  } else if (year && month && day) {
    // Year, Month, Day
    const holiday = fridagar.getHolidays(year, month).find((current) => {
      return current.date.toISOString().startsWith(`${year}-${month}-${day}`)
    })
    const results = holiday || {
      date: new Date(`${year}-${month}-${day}T00:00:00.000Z`),
      description: null,
      holiday: false,
    }
    // Wrap the single holiday in an array to keep responses consistent
    resolve([results])
  }
})

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
  const { year } = req.params

  lookupHolidays(year)
    .then((holidays) => res.json({ results: holidays }))
    .catch((error) => res.status(400).json(error))
})

app.get('/calendar/:year/:month', (req, res) => {
  const { year, month } = req.params

  lookupHolidays(year, month)
    .then((holidays) => res.json({ results: holidays }))
    .catch((error) => res.status(400).json(error))
})

app.get('/calendar/:year/:month/:day', (req, res) => {
  const { year, month, day } = req.params

  lookupHolidays(year, month, day)
    .then((holiday) => res.json({ results: holiday }))
    .catch((error) => res.status(400).json(error))
})

export default lookupHolidays
