<<<<<<< HEAD
var webserver = require('webserver');
var server = webserver.create();
var service = server.listen(8080, function(request, response) {
  response.statusCode = 200;
=======
// import the webserver module, and create a server
var server = require('webserver').create();

// start a server on port 8080 and register a request listener
server.listen(8080, function(request, response) {

    response.statusCode = 200;
>>>>>>> origin/master
  response.write('<html><body>Hello!</body></html>');
  response.close();
});
