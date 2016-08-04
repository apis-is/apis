import request from 'request'
import $ from 'cheerio'
import h from 'apis-helpers'
import app from '../../server'

const lookupCar = plate => new Promise((resolve, reject) => {
  // Encode carPlate so that Icelandic characters will work
  const carPlate = encodeURIComponent(plate)
  const url = `http://www.samgongustofa.is/umferd/okutaeki/okutaekjaskra/uppfletting?vq=${carPlate}`

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
      resolve({
        type: fields[0],
        subType: fields[0].substring(fields[0].indexOf('-') + 2, fields[0].indexOf('(') - 1),
        color: fields[0].substring(fields[0].indexOf('(') + 1, fields[0].indexOf(')')),
        registryNumber: fields[1],
        number: fields[2],
        factoryNumber: fields[3],
        registeredAt: fields[4],
        pollution: fields[5],
        weight: fields[6],
        status: fields[7],
        nextCheck: fields[8],
      })
    } else {
      reject(`No car found with the registry number ${plate}`)
    }
  })
})

app.get('/car', (req, res) => {
  const carPlate = req.query.number || req.query.carPlate || ''

  if (!carPlate) {
    return res.status(431).json({ error: 'Please provide a valid carPlate to lookup' })
  }

  lookupCar(carPlate)
    .then(car => res.cache().json({ results: [car] }))
    .catch(error => res.status(500).json({ error }))
})

export default lookupCar
