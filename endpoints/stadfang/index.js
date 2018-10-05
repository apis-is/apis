const app = require('../../server')
const stadfang = require('./stadfang')

/*
source: https://skra.is/library/Samnyttar-skrar-/Fyrirtaeki-stofnanir/Nidurhal/Sta%C3%B0fangaskr%C3%A1%20eigindal%C3%BDsing.pdf

0 landnr
1 fasteignaheiti
2 postnr
3 heiti_nf
4 heiti_tgf
5 husnr
6 bokst
7 lat_wgs84
8 long_wgs84

Example: 103836;Ármúli 42;108;Ármúli;Ármúla;42;;64.13349537;-21.87428225
*/

const haversineDistanceInKm = (coords1, coords2) => {
  const toRad = x => (x * Math.PI / 180)
  const R = 6371 // km

  const lon1 = coords1[0]
  const lat1 = coords1[1]
  const lon2 = coords2[0]
  const lat2 = coords2[1]

  const x1 = lat2 - lat1
  const x2 = lon2 - lon1
  const dLat = toRad(x1)
  const dLon = toRad(x2)
  const a = (
    Math.sin(dLat / 2) * Math.sin(dLat / 2)
  ) + (
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  )
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c

  return d
}

const isValidCoordinate = x => (/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/.test(x))

const getFilteredResults = (address, zipCode, street, number, letter, landNumber, coordinates, radius) => {
  const results = []
  for (let i = 0; i < stadfang.length; i++) {
    // Split string like '103836;Ármúli 42;108;Ármúli;Ármúla;42;;64.13349537;-21.87428225' into parts
    const part = stadfang[i].split(';')
    // Convert the parts into an object
    const item = {
      address: part[1],
      zipCode: part[2],
      streetNf: part[3],
      streetThf: part[4],
      houseNumber: part[5],
      houseLetter: part[6],
      landNumber: part[0],
      coordinates: [parseFloat(part[7]), parseFloat(part[8])]
    }

    // The actual filtering
    if (
      (address === '' || address === item.address.toLowerCase()) &&
      (zipCode === '' || zipCode === item.zipCode) &&
      (street === '' || street === item.streetNf.toLowerCase() || street === item.streetThf.toLowerCase()) &&
      (number === '' || number === item.houseNumber) &&
      (letter === '' || letter === item.houseLetter.toLowerCase()) &&
      (landNumber === '' || landNumber === item.landNumber) &&
      (coordinates.length === 0 || haversineDistanceInKm(item.coordinates, coordinates) < radius)
    ) {
      results.push(item)
    }
  }

  return results
}

app.get('/stadfang', (req, res) => {
  const address = (req.query.address || '').toLowerCase()
  const zipCode = req.query.zipCode || ''
  const street = (req.query.street || '').toLowerCase()
  const number = req.query.number || ''
  const letter = (req.query.letter || '').toLowerCase()
  const landNumber = req.query.landNumber || ''
  const latitude = req.query.latitude || ''
  const longitude = req.query.longitude || ''
  const radius = parseFloat(req.query.radius || '1.0')

  const coordinates = []
  if (latitude !== '' && longitude !== '' && isValidCoordinate(latitude) && isValidCoordinate(longitude)) {
    coordinates.push(parseFloat(latitude))
    coordinates.push(parseFloat(longitude))
  }

  // Check if no parameters were provided
  if ([address, zipCode, street, number, letter, landNumber].every(x => x === '') && coordinates.length === 0) {
    return res.status(400).json({ error: 'No parameters were provided' })
  }

  const obj = {
    results: []
  }

  obj.results = getFilteredResults(address, zipCode, street, number, letter, landNumber, coordinates, radius)

  return res.json(obj)
})
