// import the webserver module, and create a server
var server = require('webserver').create();

// start a server and register a request listener
var port = require('system').env.PORT || 8080; // default back to 8080
console.log(port);
var queryString = window.location.search;
var subqueryString = queryString.substring(1);
console.log(queryString);
console.log(subqueryString);

server.listen(port, function(request, response) {

  var page = new WebPage();
  page.settings.resourceTimeout = 550;

//page.open('http://www.biography.com/people/search/obama', function (status) {
  page.open('http://radiosearchengine.com', function (status) {
    //page.evaluate(function(){

    //});
	console.log('Status: ' + status);
  
    var events = page.evaluate(function(){
      return $('.vevent .summary').map(function(e){ 
        return '* ' + this.innerText
      }).toArray().join('\n');
    });

    response.statusCode = 200;
	response.write(queryString + ' ' + subqueryString);
    response.write(events);
    response.close();

    page.close();

  });
});

