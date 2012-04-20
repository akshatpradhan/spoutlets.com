/**
 * Test suite for user module.
 * This should only be run against a test database, NEVER production
 * @author Don Nguyen
 */

var auth = require("../routes/auth");
var assert = require("assert");
var should = require('should');

suite('auth', function() {


    test('addUser should add a new user without error', function(done) {

        var username = "testUser" + Math.random();
        auth.addUser(username, "testPassword", function(err, user) {
            should.not.exist(err);
            user.username.should.eql(username);
            done();
        });

    });

    test('encrypt should return the same output for the same inputs', function(done) {

        var password = "sample";
        var encrypted1 = auth.encrypt(password, "salt");
        var encrypted2 = auth.encrypt(password, "salt");
        encrypted1.should.eql(encrypted2);
        done();

    });

    test('encrypt should return different output different salts', function(done) {

        var password = "sample";
        var encrypted1 = auth.encrypt(password, "salt");
        var encrypted2 = auth.encrypt(password, "different");
        encrypted1.should.not.eql(encrypted2);
        done();

    });

    test('getUser should handle non-existent users', function(done) {

        var username = "testUser" + Math.random();
        auth.getUser(username, function(err, user) {
            should.not.exist(user);
            done();
        });

    });

    test('getUser should retrieve user by username', function(done) {

        var username = "testUser" + Math.random();
        auth.addUser(username, "testPassword", function(err, user) {
            auth.getUser(username, function(err, user) {
                should.not.exist(err);
                user.username.should.eql(username);
                done();
            });
        });


    });


    test('removeUser should handle non-existent user', function(done) {

        var username = "testUser" + Math.random();
        auth.removeUser(username, function(err) {
            auth.getUser(username, function(err, user) {
                should.not.exist(user);
                done();
            });
        });


    });

    test('removeUser should remove user', function(done) {

        var username = "testUser" + Math.random();
        users.addUser(username, "testPassword", "John", function(err, user) {
            should.exist(user);
            auth.removeUser(username, function(err) {
                auth.getUser(username, function(err, user) {
                    should.not.exist(user);
                    done();
                });
            });
        });


    });


});