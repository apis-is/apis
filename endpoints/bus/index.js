// const request = require('request')
// const h = require('apis-helpers')
const app = require('../../server')

app.post('/bus/search', (req, res) => {
  return res.status(404).json({
    error: "This api endpoint has been closed, because Bus.is changed it's markup.",
  })
})
