// import the webserver module, and create a server
var server = require('webserver').create();

// start a server and register a request listener
var port = require('system').env.PORT || 8080; // default back to 8080
server.listen(port, function(request, response) {

  var page = new WebPage();

  page.open("http://lanyrd.com/places/oxfordshire/", function(){
    var events = page.evaluate(function(){
      return $('.vevent .summary').map(function(e){ 
        return '* ' + this.innerText
      }).toArray().join('\n');
    });

    // Rather than console logging, write the data back as a 
    // response to the user
    //
    // console.log('Upcoming Events in Oxfordshire:');
    // console.log(events);

    response.statusCode = 200;
    response.write('Upcoming Events in Oxfordshire:\n');
    response.write(events);
    response.close();

    // We want to keep phantom open for more requests, so we
    // don't exit the process. Instead we close the page to
    // free the associated memory heap
    //
    // phantom.exit();

    page.close();

  });
});
