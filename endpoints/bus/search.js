/* eslint-disable */

var app = require('../../server')

app.post('/bus/search', function (req, res) {
	  res.status(404).json({ error: 'This api endpoint has been closed temporarily, because Bus.is changed it\'s markup.' })
}) // Old
app.get('/bus/search', function (req, res) {
	  res.status(404).json({ error: 'This api endpoint has been closed temporarily, because Bus.is changed it\'s markup.' })
})
