import app from '../../server'
import request from 'request'
import helper from 'apis-helpers'
import cheerio from 'cheerio'
import url from 'url'
import _ from 'lodash'

const baseUrl = url.parse('http://dev.phpbin.ja.is/ajax_leit.php')

// return permutation of a given word
function getDeclensions(callback, providedParams) {
  const params = Object.assign({}, providedParams)
  request.get(params, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      return res.status(500).json({
        error: 'A request to dev.phpbin.ja.is resulted in a error',
      })
    }

    let $
    const sanitisedBody = body.replace(/<!--[\s\S]*?-->/g, '')

    try {
      $ = cheerio.load(sanitisedBody)
    } catch (error) {
      return res.status(500).json({
        error: 'Parsing the data from dev.phpbin.ja.is resulted in a error',
        moreinfo: error,
      })
    }

    // Links mean results!
    const result = $('a')

    // more than 1 result from request (ex: 'hús')
    if (result.length > 1) {
      // call recursively again with new url
      const id = result[0].attribs.on_click.match(/\d+/)[0]
      baseUrl.query = { id }
      params.url = url.format(baseUrl)
      return getDeclensions(callback, params)
    }

    // else just call func to return data
    return callback($)
  })
}

// Creates a sequence of integers, each iteration creates a value and increments that value by 1
// step: specify how often to run the iteration
// increment: how much to increment after each iteration
function generateSequence(start, step, increment) {
  // ex:
  // input: start: 0, step: 4, increment: 3
  // output: [ 0, 1, 4, 5, 8, 9, 12, 13 ]
  const results = []

  _.each(_.range(start, step), (i) => {
    const value = (i + increment * i)

    results.push(value, value + 1)
  })

  return results
}

function parseTable($) {
  const type = $('small').contents().text().trim()

  // create a sequence which is the same as the index of 'Eintala' of the td's
  // in the HTML table.
  const singular = generateSequence(0, 4, 3)
  const results = []

  $('table tr td span').each((i, element) => {
    const predicate = (
      element
        .parent
        .parent
        .children
        .filter(node => node.name === 'td')[0]
        .children[0]
        .data
    )

    results.push({
      predicate,
      value: element.children[0].data,
      category: i in singular ? 'Eintala' : 'Fleirtala',
    })
  })

  return { results, type }
}

app.get('/declension/:word', (req, res) => {
  const word = req.params.word
  baseUrl.query = { q: word }

  const params = {
    url: url.format(baseUrl),
    headers: {
      'User-Agent': helper.browser(),
    },
  }

  getDeclensions((body) => {
    return res.json(parseTable(body))
  }, params)
})
