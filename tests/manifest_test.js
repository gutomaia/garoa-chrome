var assert = require('assert');

var fs = require('fs');

var content = fs.readFileSync(__dirname + '/../lib/manifest.json', 'utf8');

var manifest = eval('(' + content + ')');

exports.manifest_name_is_about_Garoa = function(test){
    test.equals(manifest.name, "Garoa Hackerspace Status");
    test.done();
};

exports.manifest_must_be_version_2 = function(test){
    test.ok(manifest.manifest_version);
    test.equals(manifest.manifest_version, 2);
    test.done();
};

exports.manifest_version_2_must_use_background = function(test){
    //must not test.fail(manifest.background_page);
    test.ok(manifest.background);
    test.done();
};