"use strict";
var lib = require("../lib/spoutlib");

exports.tracker = function(req, res) {
    
    // They have posted a mood
    if (undefined !== req.body.mood) {
        var mood = req.body.mood;
    
        // Send the mood straight back to acknowledge
        // it was received from the server
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(mood);  
    }
    
    // They have posted a tag
    else {
        var tagText = req.body.tagText;
        var feedback = 'Your mood tags: ';
        var tags = lib.extractTags(tagText);
        for (var i=0; i<tags.length; i++) {
            feedback += tags[i];
            if (i < tags.length - 1) feedback += ", ";
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(feedback);  
    }
    
};