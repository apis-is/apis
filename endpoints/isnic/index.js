import request from 'request'
import $ from 'cheerio'
import h from 'apis-helpers'
import app from '../../server'


app.get('/isnic', (req, res) => {
  const domainName = req.query.domain || ''

  if (!domainName) {
    return res.status(431).json({ error: 'Please provide a valid domainName to lookup' })
  }

  const url = `https://www.isnic.is/en/whois/search?yt1972183=%C3%81fram&type=all&query=${domainName}`

  request.get({
    headers: { 'User-Agent': h.browser() },
    url,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({
        error: 'www.isnic.is refuses to respond or give back data',
      })
    }

    const data = $(body)

    const obj = {
      results: [],
    }

    const fields = []

    data.find('.miniWhois .row').each(function () {
      const label = $(this).find('label').text().trim()
      const val = $(this).text().replace(label, '').trim()

      fields.push({ val, label })
    })

    if (fields.length > 0) {
      obj.results.push({
        domain: (fields.find(x => x.label === 'Domain:') || { val: '' }).val,
        registrantname: (fields.find(x => x.label === 'Registrant name:') || { val: '' }).val,
        address: (fields.find(x => x.label === 'Address:') || { val: '' }).val,
        city: (fields.find(x => x.label === 'City/Municipality:') || { val: '' }).val,
        postalCode: (fields.find(x => x.label === 'Postal code:') || { val: '' }).val,
        country: (fields.find(x => x.label === 'Country:') || { val: '' }).val,
        phone: (fields.find(x => x.label === 'Phone:') || { val: '' }).val,
        email: (fields.find(x => x.label === 'E-mail:') || { val: '' }).val,
        registered: (fields.find(x => x.label === 'Registered:') || { val: '' }).val,
        expires: (fields.find(x => x.label === 'Expires:') || { val: '' }).val,
        lastChange: (fields.find(x => x.label === 'Last change:') || { val: '' }).val,
      })
    }

    return res.cache(86400).json(obj)
  })
})
