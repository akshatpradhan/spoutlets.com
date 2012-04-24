'use strict';

/**
 * Test suite for Stream module.
 * This should only be run against a test database, NEVER production
 * @author Don Nguyen
 */

var stream = require("../lib/stream");
var assert = require("assert");
var should = require('should');

var db = require('../lib/db');
db.setLocal(true);

suite('stream', function() {

    test('getStreams should retrieve streams', function(done) {

        stream.getStreams(function(err, streams) {
            should.not.exist(err);
            should.exist(streams);
            done();
        });


    });

});