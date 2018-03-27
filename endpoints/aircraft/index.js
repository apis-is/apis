/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-promise-reject-errors */
const request = require('request')
const $ = require('cheerio')
const h = require('apis-helpers')
const app = require('../../server')

const lookupAircraft = searchStr => new Promise((resolve, reject) => {
  // Encode searchString so that Icelandic characters will work
  const searchString = encodeURIComponent(searchStr)
  const url = `https://www.samgongustofa.is/flug/loftfor/loftfaraskra?aq=${searchString}`
  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      reject('www.samgongustofa.is refuses to respond or give back data')
    }

    const data = $(body)
    const fieldList = []
    data.find('.vehicleinfo ul').each((index, element) => {
      const fields = []
      $(element).find('li').each((i, el) => {
        let val
        if (i < 7) {
          val = $(el).find('span').text()
        } else {
          // i === 7 contains info about aircraft owner
          // i === 8 contains info about aircraft operator
          // We'll parse these fields separately

          const text = $(el).find('span').text()
          const info = text.split(/\s{3,}/g)

          val = {
            name: info[1],
            address: info[2],
            locality: info[3],
            country: info[4],
          }
        }

        fields.push(val)
      })

      if (fields.length > 0) {
        fieldList.push(fields)
      }
    })

    if (fieldList.length > 0 && fieldList[0].length > 0) {
      resolve(fieldList.map((fields) => {
        return {
          id: fields[0],
          registrationNumber: parseInt(fields[1], 10),
          type: fields[2],
          buildYear: parseInt(fields[3], 10),
          serialNumber: parseInt(fields[4], 10),
          maxWeight: parseInt(fields[5], 10),
          passengers: parseInt(fields[6], 10),
          owner: fields[7],
          operator: fields[8],
        }
      }))
    } else {
      reject(`No aircraft found with the query ${searchStr}`)
    }
  })
})

app.get('/aircraft', (req, res) => {
  const search = req.query.search || ''

  if (!search) {
    return res.status(431).json({ error: 'Please provide a valid search string to lookup' })
  }

  lookupAircraft(search)
    .then(aircraft => res.cache().json({ results: aircraft }))
    .catch(error => res.status(500).json({ error }))
})

module.exports = lookupAircraft
