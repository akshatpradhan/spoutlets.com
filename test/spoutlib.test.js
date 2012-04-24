var lib = require("../lib/spoutlib");
var should = require('should');

suite('auth', function() {


    test('extractTags should return tags', function(done) {

        var text = "demo #tagrandom blah #another ok 123 #last end";
        var tags = lib.extractTags(text);
        tags[0].should.eql('#tagrandom');
        tags[1].should.eql('#another');
        tags[2].should.eql('#last');
        done();

    });

    test('millisSecond should return tags', function(done) {

        done();

    });
    
});