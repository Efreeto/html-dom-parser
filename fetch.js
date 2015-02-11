// import the webserver module, and create a server
var server = require('webserver').create();

// start a server and register a request listener
var port = require('system').env.PORT || 8080; // default back to 8080
console.log(port);
//var queryString = window.location.search;
var queryString = document.location.search;
var subqueryString = queryString.substring(1);
console.log(queryString);
console.log(subqueryString);

server.listen(port, function(request, response) {

  var page = new WebPage();
  page.settings.resourceTimeout = 750;

//page.open('http://www.biography.com/people/search/obama', function (status) {
  page.open('http://radiosearchengine.com', function (status) {

    console.log('Status: ' + status);
    response.statusCode = 200;
    response.write(queryString);
    response.write(subqueryString);
    response.write(page.content);
    response.close();

    page.close();

  });
});

