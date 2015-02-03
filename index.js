//Load up the es6 to es5 converter
require("6to5/register")({
  ignore: false
});

//Require our server
require('./server')