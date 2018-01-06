var express = require('express');
var bodyParser = require('body-parser')
var cheerio = require('cheerio');
var request = require('request');
var s = require('string')

var app = express();

function get_link(url) {

    var link = url;
    
    var text1 = s(link).chompLeft('http://vcplayer.vcmedia.vn/1.1/?_site=vtv&vid=').s;
    
    var text2 = s(text1).splitLeft('&');
    var text3 = 'http://vhosting.vcmedia.vn/'  + text2[0];
return text3;
}

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});


app.post('/', function (req, res) {   
    var url = req.body.vtv;

    request(url,function(err, resp, body){
        var vtv_source = cheerio.load(body);
        var link = vtv_source('.VCSortableInPreviewMode').attr('data-src');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('');
        res.write('');
        res.write('<center> <br> <br> <br> <a href="' + get_link(link) + '">' + get_link(link) + '</a> </center>');
        res.end();
    });

});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});
   