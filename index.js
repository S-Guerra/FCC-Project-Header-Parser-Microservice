// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

// my code here ////////////////////////////////////////////////////////////
app.get('/api/whoami', function (req, res) {
    // 1. find IP address
    let ipAddress = req.get("X-Forwarded-For");
    // 2. find preferred language
    let acceptLanguage = req.get("Accept-Language");
    // 3. find software used
    let foundSoftware = req.get("User-Agent");

    res.json({ ipaddress: ipAddress, language: acceptLanguage, software: foundSoftware });
})

////////////////////////////////////////////////////////////////////////////
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
