'use strict';

var stream = require("../lib/stream");
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
                //for (var i=0;i<docs.length; i++) console.log(docs[i]);
                res.render('vent-stream.ejs', {locals: {streams: docs}});
            });
        }
        else {
          res.render('vent-stream.ejs', {locals: {streams: streams}}); 
        }
        
    }
};