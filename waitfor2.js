/* http://stackoverflow.com/questions/11340038/phantomjs-not-waiting-for-full-page-load */
var page = require("webpage").create(),
    url = "http://twitter.com/#!/sencha";

var fs = require('fs');

function onPageReady() {
    var htmlContent = page.evaluate(function () {
        return document.documentElement.outerHTML;
    });

    fs.write('waitfor2.html', htmlContent, 'w');   // htmlContent, page.content (little difference)

    phantom.exit();
}

page.open(url, function (status) {
    function checkReadyState() {
        setTimeout(function () {
            var readyState = page.evaluate(function () {
                return document.readyState;
            });

            if ("complete" === readyState) {
                onPageReady();
            } else {
                checkReadyState();
            }
        });
    }

    checkReadyState();
});