var assert = require('assert');

var fs = require('fs');

eval(fs.readFileSync(__dirname + '/../lib/garoa.js', 'utf8'));

exports.test_fixture_open = function(test){
    fixture = fs.readFileSync(__dirname + '/../fixtures/status.open.json', 'utf8');
    test.equal(is_garoa_open(fixture), 2);
    test.done();
};

exports.test_fixture_closed = function(test){
    fixture = fs.readFileSync(__dirname + '/../fixtures/status.closed.json', 'utf8');
    test.equal(is_garoa_open(fixture), 0);
    test.done();
};