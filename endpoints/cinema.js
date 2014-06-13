var cinema = require('apis-cinema');

function getCinema (req, callback) {
  cinema.root(req.params.id, callback);
}

function getTheaters (req, callback) {
  cinema.theaters(req.params.id, callback);
}

module.exports = function(app) {
  app.get('/', 3600, getCinema);
  app.get('/theaters', 3600, getTheaters);
};