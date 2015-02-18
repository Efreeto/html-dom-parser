
/* http://ariya.ofilabs.com/2013/06/web-page-without-external-resources.html */

var page = require('webpage').create();
var fs = require('fs');

self = 'http://y.20q.net/gsq-en?g5XcuhapQUgdLx0B!7j78wm6JC5ogST2KZGt3L!Z,0s5Y2ap7kh,gGffK';

page.onResourceRequested = function (req, controller) {
  if (req.url.indexOf(self) !== 0) {
    controller.abort();
    return;
  }
  page.resources[req.id] = {
    request: req,
    startReply: null,
    endReply: null
  };
};

page.open(self, function (status) {
    console.log('Status: ' + status);
    
    if (status !== 'success') {
        console.log('Unable to load the address!');
    } else {
        //window.setTimeout(function () {
            page.render('export.png');
            fs.write('export.html', page.content, 'w');
            phantom.exit();
        //}, 1000);
    }
});