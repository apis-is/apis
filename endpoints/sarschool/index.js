import request from 'request'
import app from '../../server'
import cheerio from 'cheerio'


function pad(n) {return n < 10 ? `0${n}` : n}

const getRequest = (callback, providedUrl) => {
  const url = providedUrl || 'http://skoli.landsbjorg.is/Open/Seminars.aspx?'

  const params = { url }

  request(params, (error, res, body) => {
    if (error) throw new Error(error)

    if (res.statusCode !== 200) {
      throw new Error(`HTTP error from endpoint, status code ${res.statusCode}`)
    }

    return callback(body)
  })
}

const parseList = (body) => {
  let $
  try {
    $ = cheerio.load(body)
  } catch (error) {
    throw new Error('Could not parse body')
  }

  const results = []

  const tr = $('.rgMasterTable').find('tbody').find('tr')

  tr.each(() => {
    const td = $(this).find('td')

    // Change start time from d.m.YYYY to YYYY-mm-dd
    const startDate = td.eq(6).text().trim()
    let startDateFinal
    let sdSplit
    let sd
    if (startDate === '') {
      startDateFinal = 'n/a'
    } else {
      sdSplit = startDate.split('.')
      sd = new Date(sdSplit[2], sdSplit[1], sdSplit[0])
      startDateFinal = `${sd.getFullYear()}-${pad(sd.getMonth())}-${pad(sd.getDate())}`
    }

    // Change end time from d.m.YYYY to YYYY-mm-dd
    const endDate = td.eq(7).text().trim()
    let endDateFinal
    let edSplit
    let ed
    if (endDate === '') {
      endDateFinal = 'n/a'
    } else {
      edSplit = endDate.split('.')
      ed = new Date(edSplit[2], edSplit[1], edSplit[0])
      endDateFinal = `${ed.getFullYear()}-${pad(ed.getMonth())}-${pad(ed.getDate())}`
    }

    results.push({
      id: (td.eq(3).text().trim() === '' ? '' : parseFloat(td.eq(3).text().trim())),
      name: (td.eq(4).text().trim() === '' ? '' : td.eq(4).text().trim()),
      time_start: startDateFinal,
      time_end: endDateFinal,
      sar_members_only: (td.eq(0).find('img').length > 0 ? 1 : 0),
      host: (td.eq(5).find('input').attr('checked') === 'checked' ? 'Squad' : 'Other'),
      location: (td.eq(8).text().trim() === '' ? '' : td.eq(8).text().trim()),
      price_regular: (td.eq(9).text().trim() === '' ? '' : parseFloat(td.eq(9).text().trim().replace('.', ''))),
      price_members: (td.eq(10).text().trim() === '' ? '' : parseFloat(td.eq(10).text().trim().replace('.', ''))),
      link: `http://skoli.landsbjorg.is/Open/Course.aspx?Id=${td.eq(3).text().trim()}`,
    })
  })

  return results
}

app.get('/sarschool', (req, res) => {
  getRequest((body) => {
    return res.cache().json({
      results: parseList(body),
    })
  })
})
