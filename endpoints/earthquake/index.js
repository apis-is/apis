import request from 'request'
import cheerio from 'cheerio'
import helpers from 'apis-helpers'
import app from '../../server'
const browser = helpers.browser

/*
   This function only handles the request part and calls callback with
   the body
   */
function getEarthquakes(callback, params) {
  // eslint-disable-next-line eqeqeq
  const reqParams = !params ? {
    url: 'http://hraun.vedur.is/ja/skjalftar/skjlisti.html',
    headers: { 'User-Agent': browser() },
    // needed for some reason.. defaulting to ISO-8859-1
    encoding: 'binary',
  } : params

  request(reqParams, (error, res, body) => {
    if (error || res.statusCode !== 200) {
      return callback(new Error('Could not retrieve the data from the data source'))
    }

    return callback(error, body)
  })
}

/*
 * This function traverses the DOM, and looks for a JS variable that is included
 * in the source of vedur.is.
 * Note that it is synchronous.
 */
function parseJavaScriptVariable(body) {
  // Work with empty string if scraping fails.
  let res
  let jsonString = ''
  // Create a cheerio object from response body.
  const $ = cheerio.load(body)

  // Find the variable inside one of the <script> elements in the response body.
  $('script').each(function (i, elem) {
    if (/(VI\.quakeInfo = .+);/.test($(this).text())) {
      jsonString = $(elem).html().match(/(VI\.quakeInfo = )(.+);/)[2]
    }
  })

  // Convert the variable to JavaScript Object Notation and fix seperators in values.
  const resString = jsonString.replace(/(:\'[-0-9][0-9]*)(,)([0-9]*)/g, '$1.$3')

  // Create a Regular expression and change date representation.
  // eslint-disable-next-line max-len
  const regexDate = /(\'t\':)new Date\((([0-9.,-]+),([0-9.,-]+),([0-9.,-]+),([0-9.,-]+),([0-9.,-]+),([0-9.,-]+))\)(,\'a\')/g
  const dateReplace = (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
    const parsedDate = new Date(
      parseInt(p3, 10),
      parseInt(p4.split('-')[0], 10) - 1, parseInt(p5, 10),
      parseInt(p6, 10),
      parseInt(p7, 10),
      parseInt(p8, 10)
    )
    return `${p1}\\${parsedDate.toISOString()}\\${p9}`
  }

  try {
    // Create semi-final JSON string.
    res = JSON.parse(resString.replace(regexDate, dateReplace).replace(/\'/g, '"'))
  } catch (ex) {
    return JSON.parse([{ error: 'Error parsing source.' }])
  }
  // rename fields to match current specs
  const resFields = []
  res.forEach((element) => {
    const tmpRow = {}
    tmpRow.timestamp = element.t
    tmpRow.latitude = element.lat
    tmpRow.longitude = element.lon
    tmpRow.depth = element.dep
    tmpRow.size = element.s
    tmpRow.quality = element.q
    tmpRow.humanReadableLocation = `${element.dL} km ${element.dD} af ${element.dR}`
    resFields.push(tmpRow)
  })

  return resFields
}

/*
   This function only handles the DOM traversal part, and returns a
   fully formed list (synchronous).

   It should be pretty easy to split out each part of this parser into standalone
   functions, that could be unit tested (to make sure the data looks exactly like
   it's supposed to look like)
   */
function parseList(body) {
  const $ = cheerio.load(body)

  // currying of a function that parses a <td> with an icelandic number as a JS Number
  // used for the fieldsParser below
  const numberField = function (i) {
    return function ($children) {
      return + $children.eq(i).text().replace(',', '.')
    }
  }

  // for each row, all of this object's functions will be called to popoulate each
  // key in the generated object - they are all passed in the full array of
  // children (which are the cheerioed <td>s)
  const fieldsParser = {
    timestamp: ($children) => {
      // the fields are in this format: <td><a href>2015-12-30</a></td><td>21:31:24,0</td>
      const date = `${$children.eq(0).text()} ${$children.eq(1).text()}`
      return new Date(date.split(',')[0])
    },
    latitude: numberField(2),
    longitude: numberField(3),
    depth: numberField(4),
    size: numberField(5),
    quality: numberField(6),
    humanReadableLocation: ($children) => {
      // these are three <td> elements' text values combined.. there migth be a
      // cleaner way to do this, but I don't know how.
      const strObj = $children.slice(7, 10).map(function () { return $(this).text() })
      return Array.prototype.join.call(strObj, ' ').replace(/^\s*|\s*$/g, '')
    },
  }

  // This finds all the table rows in the list, except the first row, which
  // is a header row.
  const data = []

  $('table').eq(2).find('tr').slice(1).map(function () {
    const $children = $(this).children()
    const obj = {}
    for (const key in fieldsParser) {
      if (fieldsParser.hasOwnProperty(key)) {
        obj[key] = fieldsParser[key]($children)
      }
    }
    data.push(obj)
    return obj
  })

  return data
}

/*
 * Hraun table parse
 */
app.get('/earthquake/is', (req, res) => {
  getEarthquakes((error, body) => {
    if (error) {
      return res.status(500).json({ error: error.toString() })
    }

    return res.json({ results: parseList(body) })
  })
})

/*
 * Main vedur.is website (JS variable included in the source) (secondary source of information).
 */
app.get('/earthquake/is/sec', (req, res) => {
  getEarthquakes((error, body) => {
    if (error) {
      return res.json({ error: error.toString() })
    }
    return res.json({
      results: parseJavaScriptVariable(body),
    })
  }, {
    url: 'http://www.vedur.is/skjalftar-og-eldgos/jardskjalftar',
    headers: { 'User-Agent': browser() },
    // needed for some reason.. defaulting to ISO-8859-1
    encoding: 'utf-8',
  })
})
