"use strict";

/**
 * Vent management library
 */

var Vent = require('../models/Vent');

exports.addVent = addVent;
exports.getRecentVents = getRecentVents;
exports.getVent = getVent;

// Add user to database
function addVent(username, text, stream, callback) {

    var instance = new Vent();
    instance.username = username;
    instance.text = text;
    instance.stream = stream;

    instance.save(function (err) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, instance);
        }

    });

}

function getRecentVents(num, callback) {
    Vent.find().sort("_id", -1).limit(num).execFind(function(err, vents) {
        console.log('here');
        callback(err, vents);
    });
}

// Retrieve tag, return null if non-existent
function getVent(ventId, callback) {
    Vent.findOne({'_id': ventId}, function(err, doc) {
        if (err) {
            callback(err);
        }
        else {
            if (null === doc) callback(null, null);
            else callback(null, doc);
        }
    });
}