// import the webserver module, and create a server
var server = require('webserver').create();

// start a server on port 8080 and register a request listener
server.listen(80, function(request, response) {

    response.statusCode = 200;
  response.write('<html><body>Hello!</body></html>');
  response.close();
});