const request = require('request')
const _ = require('lodash')
const app = require('../../server')

app.get('/concerts', (req, res) => {
  const url = 'http://midi.is/Home/LoadMoreEventsByDate?eventType=Concerts&pageNumber='
  const page = req.query.page || 1

  request.get(url + page, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'Something came up when contacting the midi.is server!',
      })
    }
    const events = JSON.parse(body)
    const filtered = _.map(events, event => (
      _.pick(
        event,
        'eventDateName',
        'name',
        'dateOfShow',
        'userGroupName',
        'eventHallName',
        'imageSource'
      )
    ))
    return res.cache(60).json({ results: filtered })
  })
})
