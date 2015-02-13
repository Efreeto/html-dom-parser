
/* http://stackoverflow.com/questions/16856036/save-html-output-of-page-after-execution-of-the-pages-javascript */

var page = require('webpage').create();
var fs = require('fs');
page.settings.resourceTimeout = 550;

var queryString = window.location.search;
var subqueryString = queryString.substring(1);

console.log(queryString);
console.log(subqueryString);

page.open('http://www.biography.com/people/search/obama', function (status) {
//page.open('http://radiosearchengine.com', function (status) {
    //page.evaluate(function(){

    //});
    console.log('Status: ' + status);
    
    if (status !== 'success') {
        console.log('Unable to load the address!');
    } else {
        window.setTimeout(function () {
            page.render('export.png');
            fs.write('export.html', page.content, 'w');
            phantom.exit();
        }, 1000);
    }
});