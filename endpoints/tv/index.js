var app = require('../../server');

/* Root TV  */
app.get('/tv', function (req, res) {

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
            skjar1: '/tv/skjar1'
          }
        }
      ]
    }
  );
});
