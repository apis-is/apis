const app = require('../../server')

/* Root Vegagerdin  */
app.get('/road', (req, res) => {
  return res.json({
    results: [
      {
        info: 'This is an Api for Iceland\'s roads conditions',
        endpoints: {
          all: '/road/all',
          reykjavik: '/road/reykjavik',
          south: '/road/south',
          southeast: '/road/southeast',
          southwest: '/road/southwest',
          westfjords: '/road/westfjords',
          north: '/road/north',
          northeast: '/road/northeast',
          east: '/road/east',
          highlands: '/road/highlands',
        },
      },
    ],
  })
})
