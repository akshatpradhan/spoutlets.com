'use strict';

/**
 * Data seeding
 * @author Don Nguyen
 */

var _ = require('underscore');
var db = require('../lib/db');
var stream = require("../lib/stream");
var counter = 0;
var streams = ["Work", "School", "Relationships", "Mental Health"];

_.each(streams, function(text) {stream.addStream(text, done);});

function done() {
    counter++;
    if (4 == counter) db.disconnect();
}
