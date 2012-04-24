'use strict';

c
var stream = require("../lib/stream");
var vent = require("../lib/vent");
var streams;

exports['vent-stream'] = function(req, res) {
    if (undefined === req.user) {
        res.redirect('/');
    }
    else {
        if (undefined === streams) {
            stream.getStreams(function(err, docs) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.render('vent-stream.ejs', {locals: {streams: docs}});
            });
        }
        else {
          res.render('vent-stream.ejs', {locals: {streams: streams}}); 
        }
        
    }
};

exports['vent-stream-post'] = function(req, res) {
    if (undefined === req.user) {
        res.redirect('/');
    }
    else {
        
        var username = req.body.username;
        var text = req.body.vent;
        var stream = req.body.stream;
        vent.addVent(username, text, stream, function() {
            // Broadcast after added to database
            socket.getSocket().broadcast.emit('vent', {username: username, text: text, stream: stream});
            
            res.redirect('/vent-stream');
        }); 
        
    }
};