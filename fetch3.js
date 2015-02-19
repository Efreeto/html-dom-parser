// import the webserver module, and create a server
var server = require('webserver').create();

// start a server and register a request listener
var port = require('system').env.PORT || 8080; // default back to 8080

var service = server.listen(port, function(request, response) {

    var page = new WebPage();
    
    console.log('-------------------------------------------------------------------------------');
    console.log('Request at ' + new Date());
    console.log(JSON.stringify(request, null, 4));

    var urlObj = parseGET(request.url);
    var urlAddress = (typeof urlObj.url !== 'undefined') ? urlObj.url : "index.html";
    page.settings.resourceTimeout = urlObj.halttime;
    console.log('address: ' + urlAddress);
    console.log('halttime: ' + page.settings.resourceTimeout);
    console.log('waittime: ' + urlObj.waittime);

    /* simple mode (same as Chrome View Source)
    page.onResourceRequested = function(requestData, networkRequest) {
        //console.log('onResourceRequested: '+JSON.stringify(requestData.url, null, 4));
        //if ((/http:\/\/.+?\.css/gi).test(requestData['url']) || requestData.headers['Content-Type'] == 'text/css') {
        if (requestData.url.indexOf(urlAddress) !== 0) {
            networkRequest.abort();
            return;
        }
        page.resources[requestData.id] = {
            request: requestData,
            startReply: null,
            endReply: null
        };
    };
    */
    
    page.open(urlAddress, function () {
        window.setTimeout(function () {
                        
            response.statusCode = 200;    // HTTP Code: OK            
            var replaced_content = page.content.replace('function loaded','function bye');
            //var htmlContent = page.evaluate(function () { return document.documentElement.outerHTML; });
            response.write(replaced_content); // page.content, page.plainText, htmlContent(from above code)
            response.close();

            page.close();
        }, urlObj.waittime);
    });
});
if (service) {
    console.log('===============================================================================');
    console.log('Server started - Connect to http://localhost:' + port + '...');
    console.log('Ctrl+C to close server');
    console.log('');
} else {
    console.log('Error: Could not create web server listening on port '+ port);
    phantom.exit();
}

function parseGET(url){
    var query = url.substr(url.indexOf("?")+1);
    var result = {};
    query.split("&").forEach(function(part) {
        var e = part.indexOf("=")
        var key = part.substr(0, e);
        var value = part.substr(e+1);
        result[key] = decodeURIComponent(value);
    });
  return result;
}