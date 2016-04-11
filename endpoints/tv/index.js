import app from '../../server'

/* Root TV  */
app.get('/tv', (req, res) => {
  return res.json(
    {
      results: [
        {
          info: 'This is an api for Icelandic tv channel schedule\'s',
          endpoints: {
            ruv: '/tv/ruv/',
            ruvithrottir: '/tv/ruvithrottir/',
            stod2: '/tv/stod2/',
            stod2sport: '/tv/stod2sport',
            stod2sport2: '/tv/stod2sport2',
            stod2gull: '/tv/stod2gull',
            stod2bio: '/tv/stod2bio',
            stod3: '/tv/stod3',
            skjar1: '/tv/skjar1',
          },
          channels: [
            { name: 'Rúv', endpoint: '/tv/ruv/' },
            { name: 'Rúv íþróttir', endpoint: '/tv/ruvithrottir/' },
            { name: 'Stöð 2', endpoint: '/tv/stod2/' },
            { name: 'Stöð 2 Sport', endpoint: '/tv/stod2sport' },
            { name: 'Stöð 2 Sport 2', endpoint: '/tv/stod2sport2' },
            { name: 'Stöð 2 Gull', endpoint: '/tv/stod2gull' },
            { name: 'Stöð 2 Bíó', endpoint: '/tv/stod2bio' },
            { name: 'Stöð 2', endpoint: '/tv/stod3' },
            { name: 'Skjár 1', endpoint: '/tv/skjar1' },
          ],
        },
      ],
    }
  )
})
