'use strict';

/**
 * Test suite for Tag module.
 * This should only be run against a test database, NEVER production
 * @author Don Nguyen
 */

var tag = require("../lib/tag");
var assert = require("assert");
var should = require('should');

var db = require('../lib/db');
db.setLocal(true);

suite('tag', function() {

    test('addTag should add a new tag without error', function(done) {

        var tagName = "#testTag" + Math.random();
        tag.addTag(tagName,  function(err, myTag) {
            should.not.exist(err);
            myTag.tagName.should.eql(tagName);
            done();
        });

    });

    test('getTag should handle non-existent tags', function(done) {

        var tagName = "#testtag" + Math.random();
        tag.getTag(tagName, function(err, tag) {
            should.not.exist(tag);
            done();
        });

    });

    test('getTag should retrieve user by tag', function(done) {

        var tagName = "testtag" + Math.random();
        tag.addTag(tagName,  function(err, myTag) {
            tag.getTag(tagName, function(err, retrieved) {
                should.not.exist(err);
                retrieved.tagName.should.eql(tagName);
                done();
            });
        });


    });

});