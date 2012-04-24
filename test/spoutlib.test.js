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

    test('millisSecond should return time string', function(done) {

        var s1 = lib.millisToString(500);
        s1.should.eql("0 seconds ago");
        
        var s2 = lib.millisToString(5400);
        s2.should.eql("5 seconds ago");

        var s3 = lib.millisToString(1200);
        s3.should.eql("1 second ago");
        
        var s4 = lib.millisToString(74000);
        s4.should.eql("1 minute ago");

        var s4 = lib.millisToString(1000*60*60*8 + 2000);
        s4.should.eql("8 hours ago");
        
        var s5 = lib.millisToString(1000*60*60*24*6 + 2000);
        s5.should.eql("6 days ago");

        done();

    });
    
});