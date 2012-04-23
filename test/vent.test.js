'use strict';

/**
 * Test suite for Vent module.
 * This should only be run against a test database, NEVER production
 * @author Don Nguyen
 */

var vent = require("../lib/vent");
var assert = require("assert");
var should = require('should');

suite('vent', function() {

    test('addVent should add a new vent without error', function(done) {

        var username = "deltanovember";
        var text = "vent" + Math.random();
        var stream = "relationships";
        
        vent.addVent(username, text, stream,  function(err, vent) {
            should.not.exist(err);
            vent.username.should.eql(username);
            done();
        });

    });


    test('getVent should handle non-existent vents', function(done) {

        var id = "#testtag" + Math.random();
        vent.getVent(id, function(err, vent) {
            should.exist(err);
            should.not.exist(vent);
            done();
        });

    });

    test('getVent should retrieve vent by id', function(done) {

        var username = "deltanovember";
        var text = "vent" + Math.random();
        var stream = "anxiety";
        vent.addVent(username, text, stream,  function(err, myVent) {
            vent.getVent(myVent._id, function(err, retrieved) {
                should.not.exist(err);
                retrieved.username.should.eql(username);
                done();
            });
        }); 


    });

    test('getRecentVents should retrieve recent', function(done) {

        var username = "deltanovem";
        var text = "vent" + Math.random();
        var stream = "relationships";
        
        vent.addVent(username, text, stream,  function(err, myVent) {
            should.not.exist(err);
            myVent.username.should.eql(username);
            vent.getRecentVents(3, function(err, vents) {
                should.not.exist(err);
                vents[0].username.should.eql(username);
                done();
            });
        });
       

    });


});