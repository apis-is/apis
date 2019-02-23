const app = require('../../server')

/* Root Vegagerdin  */
app.get('/road', (req, res) => {
  return res.json({
    results: [
      {
        info: 'This is an Api for Iceland\'s roads conditions',
        endpoints: {
          all: '/road/all',
          // sudurland: '/road/sudurland',
          // nordurland: '/road/nordurland',
          // austurland: '/road/austurland',
          // vesturland: '/road/vesturland',
        },
      },
    ],
  })
})
