"use strict";

/**
 * Stream management library
 */

var Stream = require('../models/Stream');

exports.addStream = addStream;
exports.getStreams = getStreams;

// Add user to database
function addStream(text, callback) {

    var instance = new Stream();
    instance.text = text;

    instance.save(function (err) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, instance);
        }

    });

}

// Retrieve all streams
function getStreams(callback) {
    Stream.find({}, function(err, docs) {
        if (err) {
            callback(err);
        }
        else {
            if (null === docs) callback(null, null);
            else callback(null, docs);
        }
    });
}
