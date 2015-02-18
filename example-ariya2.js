var page = require('webpage').create();
page.settings.userAgent = 'WebKit/534.46 Mobile/9A405 Safari/7534.48.3';
page.settings.viewportSize = { width: 400, height: 600 };
 
page.onResourceRequested = function(requestData, request) {
    if ((/http:\/\/.+?\.css$/gi).test(requestData['url'])) {
        console.log('Skipping', requestData['url']);
        request.abort();
    }   
};
 
page.open('http://m.bbc.co.uk/news/health', function (status) {
    if (status !== 'success') {
        console.log('Unable to load BBC!');
        phantom.exit();
    } else {
        window.setTimeout(function () {
            page.clipRect = { left: 0, top: 0, width: 400, height: 600 };
            page.render('bbc_unstyled.png');
            phantom.exit();
        }, 1000);
    }   
});