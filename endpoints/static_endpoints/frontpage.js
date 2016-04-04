import app from '../../server'

app.get('/', (req, res) => {
  res.redirect(301, 'http://docs.apis.is')
})

app.post('/', (req, res) => {
  res.json({
    info: {
      english: 'Hey there! Check out docs.apis.is in your browser for mor info',
      icelandic: 'Velkominn á apis.is! Kíktu á docs.apis.is í vafranum þínum fyrir frekari upplýsingar!',
    },
  })
})
