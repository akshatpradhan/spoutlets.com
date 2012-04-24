"use strict";

module.exports.extractTags = extractTags;
module.exports.millisToString = millisToString;

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
        var seconds = Math.round(millis / 1000);
        if (1 == seconds)  return seconds + " second ago";
        else return seconds + " seconds ago";
    }
    else if (millis < HOUR) {
        var minutes = Math.round(millis / MINUTE);
        if (1 == minutes)  return minutes + " minute ago";
        else return minutes + " minutes ago";        
    }
    else if (millis < DAY) {
        var hours = Math.round(millis / HOUR);
        if (1 == hours)  return hours + " hour ago";
        else return hours + " hours ago";        
    }
    else if (millis < WEEK) {
        var days = Math.round(millis / DAY);
        if (1 == days)  return seconds + " day ago";
        else return days + " days ago";        
    } 
    else if (millis < YEAR) {
        var weeks = Math.round(millis / WEEK);
        if (1 == weeks)  return weeks + " week ago";
        else return weeks + " weeks ago";        
    }    
    else {
        var years = Math.round(millis / YEAR);
        if (1 == days)  return years + " year ago";
        else return years + " years ago"; 
    }
}