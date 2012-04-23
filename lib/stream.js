"use strict";

/**
 * Stream management library
 */

var Stream = require('../models/Stream');

exports.addStream = addStream;

// Add user to database
function addStream(text, callback) {

console.log('adding stream' + text);
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