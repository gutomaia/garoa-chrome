var fs = require('fs');
var util = require('util');

var assert = require('assert');

eval(fs.readFileSync(__dirname + '/../garoa/garoa.js', 'utf8'));

var open_response = {
    "status": "open for public",
    "space": "Garoa Hacker Clube",
    "url": "https://garoa.net.br",
    "lon": -46.65151967777777,
    "api": "0.12",
    "lastchange": 1330401084,
    "contact": {
        "phone": "+551136620571",
        "twitter": "garoahc",
        "foursquare": "4d8a9114d85f3704eab301dc",
        "ml": "cs@garoa.net.br" },
    "address": "Rua Vitorino Carmilo, 459 - Santa Cec\u00edlia - 01153-000 - S\u00e3o Paulo/SP - Brasil",
    "lat": -23.532896000000001,
    "logo": "https://garoahc.appspot.com/static/logo.png",
    "open": true,
    "events": [{"type": "check-in", "name": "Luis L.", "t": 1330399919}],
    "icon": {
        "open": "https://garoahc.appspot.com/static/icon_open.png",
        "closed": "https://garoahc.appspot.com/static/icon_closed.png"
    }
};

assert.ok(is_garoa_open(open_response));

var closed_response = open_response;
closed_response.open = "false"

assert.ok(!is_garoa_open(closed_response));
