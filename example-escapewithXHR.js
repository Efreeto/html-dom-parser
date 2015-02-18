/* http://stackoverflow.com/questions/24834403/phantomjs-change-webpage-content-before-evaluating number 5 */

var page = require('webpage').create();
var fs = require('fs');

url = 'http://y.20q.net/gsq-en?xR!pNSNIlmMQoh.SIG5Dut_Xn5fEsqspXx_oTB-4y';

page.open(url, function(status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        /*
        var content = page.evaluate(function(url){
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send();
            return xhr.responseText;
        }, url);
        */
        page.render('export.png');
        fs.write('export.html', page.content, 'w');
        
        //console.log(JSON.stringify(content, null, 4));
        new_content = page.content.replace('Rarely','Well donely');
        //page.render('export_replaced.png');
        fs.write('export_replaced.html', new_content, 'w');
        phantom.exit();
    }
});