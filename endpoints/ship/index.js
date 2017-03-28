import request from 'request'
import $ from 'cheerio'
import h from 'apis-helpers'
import app from '../../server'

const lookupShip = name => new Promise((resolve, reject) => {
  // Encode shipName so that Icelandic characters will work
  const shipName = encodeURIComponent(name)
  const url = `http://www.samgongustofa.is/siglingar/skrar-og-utgafa/skipaskra/uppfletting?sq=${shipName}`

  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      reject('www.samgongustofa.is refuses to respond or give back data')
    }

    const data = $(body)
    const fields = []

    data.find('.vehicleinfo ul li').each(function () {
      const val = $(this).find('span').text()
      fields.push(val)
    })

    if (fields.length > 0) {
      const registrationStatus = fields[5] === 'Skráð' ? 'Listed' : 'Unlisted';
      resolve({
        name: fields[0],
        type: fields[1],
        registrationNumber: fields[2],
        regionalCode: fields[3],
        homePort: fields[4],
        registrationStatus,
        grossTonnage: fields[6],
        bruttoTonn: fields[7],
        length: fields[8],
        build: fields[9],
        owners: fields[10],
      })
    } else {
      reject(`No ship found with the name ${name}`)
    }
  })
})

app.get('/ship', (req, res) => {
  const shipName = req.query.name || req.query.shipName || ''

  if (!shipName) {
    return res.status(431).json({ error: 'Please provide a valid shipName to lookup' })
  }

  lookupShip(shipName)
    .then(ship => res.cache().json({ results: [ship] }))
    .catch(error => res.status(500).json({ error }))
})

export default lookupShip
