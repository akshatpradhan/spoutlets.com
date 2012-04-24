"use strict";

module.exports.extractTags = extractTags;

var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;
var YEAR = 52 * WEEK;

// Extract just the tags from raw text
function extractTags(raw) {
    var tags = raw.match(/#\w+/g);
    return tags;
}

function millisToString(millis) {
    if (millis < 1000) return "0 seconds ago";
    else if (millis < 60000) {
        var seconds = millis / 1000;
        if (1 == seconds)  return seconds + " second ago";
        else return seconds + " seconds ago";
    }
}