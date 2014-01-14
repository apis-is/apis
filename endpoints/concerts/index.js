var request = require('request'),
	cheerio = require('cheerio'),
	app = require('../../server');

var numberOfPagesToFetch = 15;
//says which page is being fetched
var page = 1;
//counter for how many pages have been loaded
var counter = 0;
//an object which glues the html for all the responses
var HTMLObject = {};
//the reason for the layered approach is because the responses don't 
//necessarily arrive in order. e.g. page 4 might respond sooner than page 1. 
var HTMLString = "";

app.get('/concerts', function (req, res, next) {
  while (page < numberOfPagesToFetch){
  	request('http://midi.is/atburdir/?c=1&p='+page, function (error, response, body) {
  
  	  if (!error && response.statusCode == 200) {
  
        //so page n is placed in HTMLObject[n]
        HTMLObject[responsePage(response)] = body;
  
        ++counter;
        //if all the pages have responded, run throught the object and concetante its contents 
        //to HTMLstring
  	    if (counter+1 === numberOfPagesToFetch){
  
  	    	for (k in HTMLObject){
  	    		HTMLString += HTMLObject[k];
          }
  
          //all pages have been loaded now and are sorted
          var obj = makeJSON(HTMLString);
  
          return res.cache().json(obj);
  
        }
  
      }
  
    });
  
  	page++;
  
  }
});

//a function that takes in a response from the server, finds the URL and
//extracts the page number from it.
function responsePage(response){

  var header = response.client._httpMessage._header;
  var pageNumberIndex = header.indexOf("p=");
  //useful for 2 digit numbers
  var endOfPageNumber = header.indexOf(" ", pageNumberIndex);
  return header.substring(pageNumberIndex+2, endOfPageNumber);

}

//function that takes in an HTML string and turns it into a readable JSON object
function makeJSON(body){

  //create a DOM tree
  try{
      var $ = cheerio.load( body );
  } catch (e) {
      return res.json(500,{error:'Could not load the body with cherrio.'});
  }

  //create the json which holds the information being scraped
  var json = {
  	results : []
  }

  //the concerts are sorted relative to date
  var concertDay = $('.widecol').find('.widebox .allevents');

  //iterate through each concertDay block
  concertDay.each(function(){

  	var concertsDate = $(this).parent().prev('h4 span').text();
    var concertsByDate;

    //In case the dates are spread over two pages. To check if that happens
    //check the date of the previous entry in the array. If it matches,
    //pop the results array. If not, create a new object.
    var size = json.results.length;
  
if (size > 0 && (json.results[size-1].date === concertsDate)){

      concertsByDate = json.results.pop();

    }

    else{

      concertsByDate = {

        date : concertsDate,
        concerts : []

      };

    }

    //find the concerts which are in a table
    var concerts = $(this).find('tr');

    //iterate through each row and make an object out of the information, which is a single concert
    concerts.each(function(){

      var concert = {

        title : $(this).find(".event").children("a").text().trim(),
        info : $(this).find(".event").children("span").text().trim(),
        date : $(this).find(".date").children("span").text().trim(),
        location : $(this).find(".location").text().trim(),
        type : $(this).find(".type").text().trim()

      };

      if (concert.title != "") concertsByDate.concerts.push(concert);

     });

  	json.results.push(concertsByDate);

  });

  return json;

}
