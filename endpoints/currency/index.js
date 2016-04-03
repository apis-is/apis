import app from '../../server'

app.get('/currency', (req, res) => {
  const provider = req.query.provider || 'arion'
  const providers = ['m5', 'arion', 'lb', 'borgun']

  if (providers.indexOf(provider) >= 0) {
    return res.redirect(301, `/currency/${provider}`)
  }

  return res.status(404).json({ error: 'This provider does not exist', code: 2 })
})
