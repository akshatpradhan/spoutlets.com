"use strict";

module.exports.extractTags = extractTags;

// Extract just the tags from raw text
function extractTags(raw) {
    var tags = raw.match(/#\w+/g);
    return tags;
}