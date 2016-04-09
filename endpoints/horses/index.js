import request from 'request'
import iconv from 'iconv-lite'
import $ from 'cheerio'
import h from 'apis-helpers'
import app from '../../server'

function queryData(id, name, origin, microchip, callback) {
  const url = 'http://www.worldfengur.com/freezone_horse.jsp?c=EN'
  const headers = {
    'User-Agent': h.browser(),
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  // Encoding parameters so Icelandic characters will work
  // Hacking around to get ISO 8859-1 encoded string, pls unhack if you know better way
  const encodedName = encodeURIComponent(escape(name)).replace(/%25/g, '%')
  const encodedOrigin = encodeURIComponent(escape(origin)).replace(/%25/g, '%')

  /* eslint-disable prefer-template */
  const formData = (
    'fnr=' + id +
    '&nafn=' + encodedName +
    '&uppruni=' + encodedOrigin +
    '&ormerki=' + microchip +
    '&leitahnappur=Search+&leita=1'
  )
  /* eslint-enable */

  request.post({
    headers,
    url,
    body: formData,
    encoding: null,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      callback(error, response, '')
    }
    const htmlPage = iconv.decode(body, 'iso-8859-1')
    callback(error, response, htmlPage)
  })
}

function parseData(htmlPage) {
  const data = $(htmlPage)
  // tdElements:
  // is a list of text strings from all td elements in the returned htmlPage
  // we find data from the list by searching for key labels
  // we assume the next value in the list after a key label is a corresponding value
  const tdElements = []
  data.find('div.complete div table').each(function () {
    $(this).find('td').each(function () {
      tdElements.push($(this).text())
    })
  })
  // params:
  // name is the name of a single param
  // label is the label used on the webpage for a given param
  // value is the value of a given param, and null if it wasn't found in tdElements
  const params = [
    { name: 'id', label: 'FEIF ID', value: null },
    { name: 'name_and_origin', label: 'Name and origin', value: null },
    { name: 'ueln', label: 'UELN', value: null },
    { name: 'date_of_birth', label: 'Date of birth', value: null },
    { name: 'color_code', label: 'Colour code', value: null },
    { name: 'color', label: 'Colour ', value: null },
    { name: 'country_located', label: 'Country of current location', value: null },
    { name: 'fate', label: 'Fate ', value: null },
    { name: 'microchip', label: 'Microchip', value: null },
    { name: 'father', label: 'Sire', value: null },
    { name: 'mother', label: 'Dam', value: null },
  ]
  const labels = params.map((x) => x.label)

  // we do the following health checks
  // - check if label is in tdElements
  // - make sure the next field doesn't hold one of the labels
  // - also make sure it isn't ''
  // Note: we use 'lastIndexOf' because tdElements from the post form are included in tdElements
  //       which are identical to some of our labels, this isn't an issue though because the next
  //       value in tdElements for those elements is always ''
  for (let i = 0; i < labels.length; i++) {
    const labelLocation = tdElements.lastIndexOf(labels[i])
    if (labelLocation !== -1 && labels.lastIndexOf(tdElements[labelLocation + 1]) === -1) {
      if (tdElements[labelLocation + 1] !== '') {
        if (i < 9) {
          // first nine params values are strings
          params[i].value = tdElements[labelLocation + 1]
        } else {
          // father and mother params are objects
          // parent strings look like this: '{id} - {name_and_origin}'
          const parentInfo = tdElements[labelLocation + 1].split(' - ')
          params[i].value = {
            id: parentInfo[0],
            name_and_origin: parentInfo[1],
          }
        }
      }
    }
  }

  const results = []
  if (params[0].value && params[1].value) {
    // here we successfully found id and name of horse
    // we 'correctly' assume we received a single-record result
    const result = {}
    for (let i = 0; i < params.length; i++) {
      result[params[i].name] = params[i].value
    }
    results.push(result)
  } else {
    // there is a chance we received a multi-records result
    // then we have string like 'Number: 2' in tdElements if number of records were 2
    // we check if multi-records are in result
    let multiRecords = false
    let countIndex = -1
    for (let i = 0; i < tdElements.length; i++) {
      if (tdElements[i].indexOf('Number: ') === 0) {
        multiRecords = true
        countIndex = i
        break
      }
    }
    if (multiRecords) {
      // for multi-records we receive less data for each horse than in single-record result
      // we get 5 td elements for each horse, explaining the i*5 below
      // we fish out only id and name for each horse and return list of those
      const numRecords = Number(tdElements[countIndex].replace('Number: ', ''))
      for (let i = 0; i < numRecords; i++) {
        if (!tdElements[countIndex + 1 + i * 5]) {
          // when numRecords becomes very high it becomes at maximum 5000 but we don't always
          // get exactly 5000 results in the html it seems
          continue
        }
        const horseInfo = tdElements[countIndex + 1 + i * 5].split(' - ')
        let colorCode = null
        let color = null
        let fate = null
        let countryLocated = null
        if (tdElements[countIndex + 2 + i * 5] !== '') {
          colorCode = tdElements[countIndex + 2 + i * 5]
        }
        if (tdElements[countIndex + 3 + i * 5] !== '') {
          color = tdElements[countIndex + 3 + i * 5]
        }
        if (tdElements[countIndex + 4 + i * 5] !== '') {
          fate = tdElements[countIndex + 4 + i * 5]
        }
        if (tdElements[countIndex + 5 + i * 5] !== '') {
          countryLocated = tdElements[countIndex + 5 + i * 5]
        }
        results.push({
          id: horseInfo[0],
          name_and_origin: horseInfo[1],
          ueln: null,
          date_of_birth: null,
          color_code: colorCode,
          color,
          country_located: countryLocated,
          fate,
          microchip: null,
          father: null,
          mother: null,
        })
      }
    }
  }
  return results
}

function asyncLoop(obj) {
  // http://stackoverflow.com/a/7654602/2401628
  let i = -1
  const loop = () => {
    i++
    if (i === obj.length) {
      obj.callback()
      return
    }
    obj.functionToLoop(loop, i)
  }
  // init
  loop()
}

app.get('/horses', (req, res) => {
  const id = req.query.id || ''
  const name = req.query.name || ''
  const origin = req.query.origin || ''
  const microchip = req.query.microchip || ''

  if (!id && !(name && origin) && !microchip) {
    return res.status(400).json({
      error: 'Please provide at least one of the following: id, name and origin or microchip',
    })
  }

  queryData(id, name, origin, microchip, (error, response, htmlPage) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'www.worldfengur.com refuses to respond or give back data',
      })
    }
    const results = parseData(htmlPage)
    if (results.length > 1 && results.length < 8) {
      // we receive less data for multi-records, so we do additional query for each result if
      // we didn't get more than 8 results, else we just return the incomplete data we received
      // we 'correctly' assume that id lookups only return single-record result or empty
      const completeMultiResults = []
      asyncLoop({
        length: results.length,
        functionToLoop: (loop, i) => {
          queryData(results[i].id, '', '', '', (err, qRes, fields) => {
            const singleResult = parseData(fields)[0]
            completeMultiResults.push(singleResult)
            loop()
          })
        },
        callback: () => {
          return res.cache().json({ results: completeMultiResults })
        },
      })
    } else {
      return res.cache().json({ results })
    }
  })
})
